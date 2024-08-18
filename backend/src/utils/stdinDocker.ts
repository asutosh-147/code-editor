import * as Dockerode from "dockerode";
import * as stream from "stream";
import {ContainerCreateOptions, HostConfig} from "dockerode";

export async function dockerRunWithStdIn(
    docker: Dockerode,
    stdin: NodeJS.ReadableStream | Buffer,
    options: {name: string} & ContainerCreateOptions
): Promise<Buffer> {
    return await new Promise<Buffer>(async (resolve, reject) => {
        let stdOutAndStdErr: Buffer = Buffer.from('');
        let currentChunk = Buffer.from('');

        const attachStream = new stream.Writable({
            write: function (chunk: Buffer, encoding, next) {
                //header := [8]byte{STREAM_TYPE, 0, 0, 0, SIZE1, SIZE2, SIZE3, SIZE4}
                currentChunk = Buffer.concat([currentChunk, chunk]);
                //const isStdOut = currentChunk.readInt8() === 0x01;
                //const isStdErr = currentChunk.readInt8() === 0x02;
                const payloadSize: number = currentChunk.readUInt32BE(4);

                while (currentChunk.byteLength >= 8 + payloadSize) {
                    stdOutAndStdErr = Buffer.concat([stdOutAndStdErr, currentChunk.slice(8, 8 + payloadSize)]);
                    currentChunk = currentChunk.slice(8 + payloadSize);
                }
                next();
            },
        });

        async function removeContainer() {
            try {
                await docker.getContainer(options.name).remove({force: true});
            } catch (error) {
            }
        }

        docker.createContainer(Object.assign({
            OpenStdin: true,
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            StdinOnce: true,
        }, options), (err, container) => {
            if (err || !container) {
                reject(new Error(err || 'no container object'));
                return;
            }

            container.attach({
                stream: true,
                stdin: true,
                hijack: true,
                stdout: true,
                stderr: true,
            }, (err, dockerStream) => {
                if (err || !dockerStream) {
                    removeContainer();
                    reject(new Error(err));
                    return;
                }

                dockerStream.pipe(attachStream);
                const startTime = Date.now();
                container.start((err, data) => {
                    if (err) {
                        removeContainer();
                        reject(new Error(err));
                        return;
                    }

                    if (stdin instanceof Buffer) {
                        dockerStream.end(stdin);
                    } else {
                        stdin.pipe(dockerStream);
                    }

                    const interval = setInterval(()=>{
                        const secondsSpent = Math.floor((Date.now() - startTime)/1000);
                        if(secondsSpent >= 7){
                            clearInterval(interval);
                            removeContainer();
                            resolve(Buffer.from("Time Limit Exceeded"));
                        }
                    },500)

                    container.wait(async (err, data) => {
                        clearInterval(interval);
                        if (err) {
                            removeContainer();
                            reject(err);
                            return;
                        }
                        removeContainer();
                        resolve(stdOutAndStdErr);
                    });
                });
            });
        });
    });
}
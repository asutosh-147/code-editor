import Docker from "dockerode";
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

export async function runCodeInDocker(language:string, code:string) {
  try {
    // Choose an image based on the programming language
    let image;
    if (language === "python") {
      image = 'python:3.8';
    } else if (language === 'node') {
      image = 'node:14';
    }

    // Create a container with the chosen image
    const container = await docker.createContainer({
      Image: image,
      Cmd: ['/bin/sh', '-c', `echo "${code}" > script.${language} && ${language} script.${language}`],
      Tty: false
    });

    // Start the container
    await container.start();

    // Capture and stream logs (stdout and stderr)
    const logs = await container.logs({ stdout: true, stderr: true, follow:true });
    let output='';
    await new Promise<void>((res)=>{
        logs.on('data', (data) => {
          output = data.toString();
          res();
        })
    })
    await container.wait();
    await container.remove();
    console.log('Code execution finished.');

    return output;

  } catch (error) {
    console.error('Error running code in Docker:', error);
  }
}
// runCodeInDocker("python","print('Hello world')");
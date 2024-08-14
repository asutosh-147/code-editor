import Docker from "dockerode";
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

export async function runCodeInDocker(language:string, code:string) {
  try {
    
    let image;
    if (language === "python") {
      image = 'python:3.8';
    } else if (language === 'node') {
      image = 'node:14';
    }

    
    const container = await docker.createContainer({
      Image: image,
      Cmd: ['/bin/sh', '-c', `echo "${code}" > script.${language} && ${language} script.${language}`],
      Tty: false
    });

    
    await container.start();


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
import Docker from "dockerode";
const docker = new Docker();

export async function runCodeInDocker(language:string, code:string) {
  try {
    
    let image, fileName, compileCommand, runCommand;


        switch (language.toLowerCase()) {
            case 'cpp':
                image = 'gcc:latest';
                fileName = '/tmp/program.cpp';
                compileCommand = `g++ -o /tmp/program ${fileName}`;
                runCommand = `/tmp/program`;
                break;
            case 'python':
                image = 'python:latest';
                fileName = '/tmp/program.py';
                compileCommand = '';  
                runCommand = `python ${fileName}`;
                break;
            default:
                throw new Error('Unsupported language');
        }

        
        const command = [
            `echo "${code.replace(/"/g, '\\"')}" > ${fileName}`,
            compileCommand, 
            runCommand
        ].filter(Boolean).join(' && '); 

        
        const container = await docker.createContainer({
            Image: image,
            Cmd: ['bash', '-c', command],
            AttachStdout: true,
            AttachStderr: true,
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
    // console.log(output);
    return output;

  } catch (error) {
    console.error('Error running code in Docker:', error);
  }
}


import Docker from "dockerode";
import { dockerRunWithStdIn } from "./stdinDocker";
import {v4 as uuidv4} from "uuid";
import { dockerHost, dockerPass } from "./constants";
const docker = new Docker({
  host:dockerHost,
  port:dockerPass
});

export async function runCodeInDocker(
  language: string,
  code: string,
  input: string
) {
  try {
    let image,
      fileName,
      compileCommand = "",
      runCommand;
    switch (language.toLowerCase()) {
      case "cpp":
        image = "gcc:latest";
        fileName = "/tmp/program.cpp";
        compileCommand = `g++ -o /tmp/program ${fileName}`;
        runCommand = `/tmp/program`;
        break;
      case "python":
        image = "python:latest";
        fileName = "/tmp/program.py";
        runCommand = `python ${fileName}`;
        break;
      case "javascript":
        image = "node:latest";
        fileName = "/tmp/program.js";
        runCommand = `node ${fileName}`;
        break;
      default:
        throw new Error("Unsupported language");
    }

    const command = [
      `echo "${code.replace(/"/g, '\\"')}" > ${fileName}`,
      compileCommand,
      runCommand,
    ]
      .filter(Boolean)
      .join(" && ");
    const containerName = uuidv4();

    const output = await dockerRunWithStdIn(docker, Buffer.from(input), {
      name: containerName,
      Image: image,
      Cmd: ["bash", "-c", command],
    });

    console.log("Code execution finished. with", containerName);
    return output.toString();
  } catch (error: any) {
    console.error("Error running code in Docker:", error);
    return "error in running code";
  }
}

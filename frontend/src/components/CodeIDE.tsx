import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { useState } from "react";
import { backend_url } from "../utils/constants";

const CodeIDE = () => {
  const [editorValue, setEditorValue] = useState<string | null>(null);
  const [output, setOutput] = useState<null | string>(null);
  const handleSubmit = async () =>{
    try {
        const response = await axios.post(`${backend_url}/api/code/run`,{
            language:"python",
            code:editorValue
        })
        setOutput(response.data.output);
        
    } catch (error:any) {
        console.log(error.message);
        setOutput(error.message);
    }
  }
  const handleEditorChange = (value: string | undefined) => {
    if (value) setEditorValue(value);
  };
  return (
    <div className="grid grid-rows-2 gap-20 w-full mt-20">
      <Editor
        width={"60vw"}
        height={"60vh"}
        className=""
        defaultLanguage="python"
        defaultValue="#add_your_code_here"
        onChange={handleEditorChange}
      />
      <div className="flex flex-col items-center gap-10">
        <button onClick={handleSubmit} className="bg-black text-white font-semibold rounded-md text-lg px-4 py-2 active:scale-95 transition-all duration-300">
          Run Code
        </button>
        <div className="flex flex-col border border-black px-20 items-center">
          <div className="font-bold text-2xl underline">Ouput</div>
          <div className="font-semibold text-xl">
            {output}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeIDE;

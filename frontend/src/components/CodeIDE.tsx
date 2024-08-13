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

    <div className="flex flex-col gap-5 pt-2 w-max mx-auto mb-10">
      <div className="flex self-start">
        <select name="language" id="lang" className="bg-gray-800 text-white p-1 font-semibold rounded-lg">
          <option value="python">python</option>
          <option value="javascript">javascript</option>
          <option value="cpp">cpp</option>
        </select>
      </div>
      <Editor
        width={"60vw"}
        height={"60vh"}
        className="shadow-2xl"
        theme="vs-dark"
        defaultLanguage="python"
        defaultValue="#add_your_code_here"
        onChange={handleEditorChange}
      />
      <div className="flex flex-col items-center gap-10 text-white">
        <button onClick={handleSubmit} className="bg-black font-semibold rounded-md text-lg px-4 py-2 active:scale-95 transition-all duration-300">
          Run Code
        </button>
        <div className="flex flex-row gap-20 items-center">
          <div className="font-bold text-2xl">Ouput</div>
          <div className="font-semibold text-xl border-2 bg-gray-100 text-black border-white px-20 min-h-32 min-w-96">
            {output}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeIDE;

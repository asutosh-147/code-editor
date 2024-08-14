import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { useState } from "react";
import { backend_url } from "../utils/constants";
import Input from "./Input";
import Output from "./Output";

const CodeIDE = () => {
  const [editorValue, setEditorValue] = useState<string | null>(null);
  const [output, setOutput] = useState<null | string>(null);
  const [input, setInput] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("python");
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${backend_url}/api/code/run`, {
        language: "python",
        code: editorValue,
      });
      setOutput(response.data.output);
    } catch (error: any) {
      console.log(error.message);
      setOutput(error.message);
    }finally{
      setLoading(false);
    }
  };
  const handleEditorChange = (value: string | undefined) => {
    if (value) setEditorValue(value);
  };
  return (
    <div className="grid grid-cols-6 gap-5 p-2 w-full h-full">
      <div className="flex flex-col items-start col-span-4 text-white">
        <div className="flex items-center justify-center w-full gap-5 p-2">
          <select
            name="language"
            id="lang"
            className="bg-zinc-800 px-2 py-1 font-semibold rounded-md text-md"
            value={lang}
            onChange={(e)=>{setLang(e.target.value)}}
          >
            <option className="bg-zinc-800" value="python">python</option>
            <option className="bg-zinc-800" value="javascript">javascript</option>
            <option className="bg-zinc-800" value="cpp">cpp</option>
          </select>
          <button
            onClick={handleSubmit}
            className="bg-black font-semibold rounded-md text-md px-4 py-1 active:scale-95 transition-all duration-300"
          >
            Run Code
          </button>
        </div>
        <Editor
          className="shadow-2xl"
          height={650}
          theme="vs-dark"
          language={lang}
          onChange={handleEditorChange}
        />
      </div>
      <div className="grid grid-rows-3 gap-5 text-zinc-200 col-span-2">
        <Input input={input} setInput={setInput}/>
        <Output output={output} loading={loading} />
      </div>
    </div>
  );
};

export default CodeIDE;

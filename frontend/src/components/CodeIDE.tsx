import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { useState } from "react";
import { backend_url, SupportedLangs } from "../lib/constants";
import Input from "./Input";
import Output from "./Output";
import ToolBar from "./ToolBar";
import { useRecoilValue } from "recoil";
import { themeAtom } from "@/store/atoms/theme";

const CodeIDE = () => {
  const [editorValue, setEditorValue] = useState<string | null>(null);
  const theme = useRecoilValue(themeAtom);
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<SupportedLangs>("python");
  const handleSubmit = async () => {
    try {
      if (!editorValue || !editorValue.length) return;
      setLoading(true);
      const response = await axios.post(`${backend_url}/api/code/run`, {
        language: lang,
        code: editorValue,
        input,
      });
      setOutput(response.data.output);
    } catch (error: any) {
      console.log(error.message);
      setOutput(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleEditorChange = (value: string | undefined) => {
    if (value) setEditorValue(value);
  };
  return (
    <div className="grid grid-cols-6 gap-5 p-2 w-full h-full">
      <div className="flex flex-col items-start col-span-4 text-white">
        <ToolBar lang={lang} setLang={setLang} onSubmit={handleSubmit} />
        <Editor
          className="shadow-xl border-4 border-white dark:border-[#1e1e1e] rounded-lg"
          height="calc(100vh - 154px)"
          theme={theme=="dark" ? "vs-dark":"light"}
          language={lang}
          onChange={handleEditorChange}
        />
      </div>
      <div className="grid grid-rows-3 h-full gap-5 dark:text-zinc-200  col-span-2">
        <Input input={input} setInput={setInput} />
        <Output output={output} loading={loading} />
      </div>
    </div>
  );
};

export default CodeIDE;

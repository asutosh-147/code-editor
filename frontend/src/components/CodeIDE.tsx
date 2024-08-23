import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { backend_url, SupportedLangs } from "../lib/constants";
import Input from "./Input";
import Output from "./Output";
import ToolBar from "./ToolBar";
import { useRecoilValue } from "recoil";
import { themeAtom } from "@/store/atoms/theme";
import { useUser } from "@/store/hooks/useUser";
import { useNavigate } from "react-router-dom";

const CodeIDE = () => {
  const user = useUser();
  const navigate = useNavigate();
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
      setOutput(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleEditorChange = (value: string | undefined) => {
    if (value) setEditorValue(value);
  };

  const fetchTimeComplexity = async () => {
    try {
      setLoading(true);
      if (!editorValue || !editorValue.length) return;
      const response = await axios.post(`${backend_url}/api/code/time`, {
        code: editorValue,
      });
      setOutput(response.data.complexity);
    } catch (error:any) {
      setOutput(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    if(!user){
      navigate("/login");
    }
  },[user,navigate])
  return (
    <div className="grid h-full w-full grid-cols-6 gap-5 p-2">
      <div className="col-span-4 flex flex-col items-start text-white">
        <ToolBar
          lang={lang}
          setLang={setLang}
          onSubmit={handleSubmit}
          getTC={fetchTimeComplexity}
        />
        <Editor
          className="rounded-lg border-4 border-white shadow-xl dark:border-[#1e1e1e]"
          height="calc(100vh - 154px)"
          theme={theme == "dark" ? "vs-dark" : "light"}
          language={lang}
          onChange={handleEditorChange}
        />
      </div>
      <div className="col-span-2 grid h-full grid-rows-3 gap-5 dark:text-zinc-200 pt-7">
        <Input input={input} setInput={setInput} />
        <Output output={output} loading={loading} />
      </div>
    </div>
  );
};

export default CodeIDE;

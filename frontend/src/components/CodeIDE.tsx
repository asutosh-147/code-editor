import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { backend_url } from "../lib/constants";
import Input from "./Input";
import Output from "./Output";
import ToolBar from "./ToolBar";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeAtom } from "@/store/atoms/theme";
import { useUser } from "@/store/hooks/useUser";
import { useNavigate } from "react-router-dom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { codeAtomFamily, langAtom } from "@/store/atoms/editor";
import { toast } from "sonner";
const CodeIDE = ({ id }: { id: number }) => {
  const user = useUser();
  const navigate = useNavigate();
  const [data, setData] = useRecoilState(codeAtomFamily(id));
  const theme = useRecoilValue(themeAtom);
  const lang = useRecoilValue(langAtom);
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      if (!data?.code || !data?.code.length) return;
      setLoading(true);
      const response = await axios.post(
        `${backend_url}/api/code/run`,
        {
          language: lang,
          code: data.code,
          input: data.input,
        },
        {
          withCredentials: true,
        },
      );
      setOutput(response.data.output);
    } catch (error: any) {
      setOutput(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleEditorChange = (value: string | undefined) => {
    if (value != undefined) {
      setData((prev) => {
        if (prev) {
          return { ...prev, code: value };
        }
        return null;
      });
      localStorage.setItem("code", value);
    }
  };

  const fetchTimeComplexity = async () => {
    try {
      setLoading(true);
      if (!data?.code || !data.code.length) return;
      const response = await axios.post(
        `${backend_url}/api/code/time`,
        {
          code: data.code,
        },
        { withCredentials: true },
      );
      setOutput(response.data.complexity);
    } catch (error: any) {
      setOutput(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  const save = useCallback(async () => {
    const response = await axios.post(
      `${backend_url}/api/file/code/save`,
      {
        ...data,
      },
      {
        withCredentials: true,
      },
    );
    if(response.status === 200){
      toast.success("File Saved");
    }
  }, [data]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key == "s") {
        e.preventDefault();
        save();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [save]);

  if (data == null) return <div>noValue</div>;
  return (
    <div className="flex h-screen flex-col items-center">
      <ToolBar onSubmit={handleSubmit} getTC={fetchTimeComplexity} />
      <ResizablePanelGroup
        direction="horizontal"
        className="grid h-full w-full flex-1 grid-cols-6 gap-[0.01rem] p-1"
      >
        <ResizablePanel
          defaultSize={75}
          className="col-span-4 flex flex-col items-start text-white"
        >
          <Editor
            className="rounded-l-lg border-4 border-white shadow-xl dark:border-[#1e1e1e]"
            height="100%"
            theme={theme == "dark" ? "vs-dark" : "light"}
            language={lang}
            value={data.code}
            onChange={handleEditorChange}
          />
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className="border-none bg-gray-300 active:bg-cyan-500 dark:bg-zinc-700 active:dark:bg-cyan-500"
        />
        <ResizablePanel defaultSize={25}>
          <ResizablePanelGroup
            direction="vertical"
            className="col-span-2 flex min-h-full flex-col dark:text-zinc-200"
          >
            <ResizablePanel defaultSize={25}>
              <Input input={data.input} setInput={setData} />
            </ResizablePanel>
            <ResizableHandle
              withHandle
              className="border-none bg-gray-300 active:bg-blue-600 dark:bg-zinc-700 active:dark:bg-green-400"
            />
            <ResizablePanel defaultSize={75}>
              <Output output={output} loading={loading} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CodeIDE;

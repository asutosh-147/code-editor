import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { backend_url } from "../lib/constants";
import Input from "./Input";
import Output from "./Output";
import ToolBar from "./ToolBar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { themeAtom } from "@/store/atoms/theme";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { codeAtomFamily, langAtom } from "@/store/atoms/editor";
import { toast } from "sonner";
import { sideBarAtom } from "@/store/atoms/sidebar";
const CodeIDE = ({ id }: { id: number }) => {
  const [data, setData] = useRecoilState(codeAtomFamily(id));
  const theme = useRecoilValue(themeAtom);
  const lang = useRecoilValue(langAtom);
  const setSideBar =useSetRecoilState(sideBarAtom);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(true);
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
      setData(prev => prev ? {...prev,output:response.data.output}:null);
    } catch (error: any) {
      setData(prev => prev ? {...prev,output:error.message}:null);
    } finally {
      setLoading(false);
    }
  };
  const handleEditorChange = (value: string | undefined) => {
    if (value != undefined) {
      if(saved) setSaved(false);
      setData((prev) => {
        if (prev) {
          return { ...prev, code: value };
        }
        return null;
      });
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
      setData(prev => prev ? {...prev,output:response.data.complexity}:null);
    } catch (error: any) {
      setData(prev => prev ? {...prev,output:error.message}:null);
    } finally {
      setLoading(false);
    }
  };
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
    setSaved(true);
  }, [data]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key == "s") {
        e.preventDefault();
        save();
      }
      else if(e.ctrlKey && e.key == 'b'){
        setSideBar(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [save,setSideBar]);
  useEffect(() => {
    setSideBar(false);
  
    return () => {
      
    }
  }, [id, setSideBar])
  
  return (
    <div className="flex h-screen flex-col items-center">
      <ToolBar onSubmit={handleSubmit} getTC={fetchTimeComplexity} saved={saved} onSave={save} />
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
            value={data?.code}
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
              <Input input={data?.input ?? ''} setInput={setData} />
            </ResizablePanel>
            <ResizableHandle
              withHandle
              className="border-none bg-gray-300 active:bg-blue-600 dark:bg-zinc-700 active:dark:bg-green-400"
            />
            <ResizablePanel defaultSize={75}>
              <Output output={data?.output ?? ''} loading={loading} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CodeIDE;

import { themeAtom } from "@/store/atoms/theme";
import { useToggleTheme } from "@/store/hooks/toggleTheme";
import { memo, useEffect, useRef } from "react";
import { FaCheck, FaPlay } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { MdLightMode } from "react-icons/md";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { RiSpeedUpFill } from "react-icons/ri";
import { sideBarAtom } from "@/store/atoms/sidebar";
import Tooltip from "./ui/Tooltip";
import Button from "./ui/Button";
import Timer from "./Timer";
import ConvertCode from "./ConvertCode";
import LangSelector from "./LangSelector";
import { LuFiles } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
type ToolBarProps = {
  onSubmit: () => void;
  getTC: () => void;
  saved: boolean;
  onSave: () => void;
};
const ToolBar = memo(({ onSubmit, getTC, saved, onSave }: ToolBarProps) => {
  const theme = useRecoilValue(themeAtom);
  const toggleTheme = useToggleTheme();
  const setSideBar = useSetRecoilState(sideBarAtom);
  const toggleSideBar = () => setSideBar((prev) => !prev);
  const runCodeRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key == "'") runCodeRef.current?.click();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex w-full items-center p-2 pt-7 text-zinc-50 dark:text-zinc-200">
      <div className="flex flex-grow justify-center gap-2">
        <Button onClick={toggleSideBar} className="p-1 text-lg dark:text-white">
          <LuFiles />
          <Tooltip title="Explorer" position="top" />
        </Button>
        <Timer />
        <LangSelector />
        <Button ref={runCodeRef} onClick={onSubmit}>
          <FaPlay className="text-xs" />
          <div>Run Code</div>
          <Tooltip title="Ctrl + '" position="top" />
        </Button>
        <ConvertCode />
        <Button onClick={getTC}>
          <RiSpeedUpFill className="text-lg" />
          <Tooltip title="Time Comlexity" position="top" />
        </Button>
        <Button className="p-1 text-lg" onClick={toggleTheme}>
          {theme == "light" ? (
            <MdLightMode />
          ) : (
            <IoMdMoon className="text-zinc-200" />
          )}
          <Tooltip title="Theme" position="top" />
        </Button>
      </div>

      <Button
        onClick={onSave}
        className="group relative ml-auto flex items-center gap-1 rounded-md bg-zinc-900 p-1 px-2 text-sm font-medium"
      >
        {!saved ? (
          <>
            save
            <GoDotFill className="mt-[0.2rem] text-lg" />
          </>
        ) : (
          <>
            saved
            <FaCheck className="text-xs" />
          </>
        )}
        <Tooltip title="ctrl + s" position="top" />
      </Button>
    </div>
  );
});

export default ToolBar;

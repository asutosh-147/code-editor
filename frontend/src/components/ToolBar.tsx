import { themeAtom } from "@/store/atoms/theme";
import { useToggleTheme } from "@/store/hooks/toggleTheme";
import { memo, useCallback, useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { MdLightMode } from "react-icons/md";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { RiSpeedUpFill } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { sideBarAtom } from "@/store/atoms/sidebar";
import Tooltip from "./ui/Tooltip";
import Button from "./ui/Button";
import Timer from "./Timer";
import ConvertCode from "./ConvertCode";
import LangSelector from "./LangSelector";
type ToolBarProps = {
  onSubmit: () => void;
  getTC: () => void;
};
const ToolBar = memo(({ onSubmit, getTC }: ToolBarProps) => {
  const theme = useRecoilValue(themeAtom);
  const toggleTheme = useToggleTheme();
  const setSideBar = useSetRecoilState(sideBarAtom);
  const toggleSideBar = useCallback(
    () => setSideBar((prev) => !prev),
    [setSideBar],
  );
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
    <div className="flex w-full items-center justify-center gap-2 p-2 pt-7 text-zinc-50 dark:text-zinc-200">
      <Button onClick={toggleSideBar} className="p-1 text-lg dark:text-white">
        <RxHamburgerMenu />
        <Tooltip title="Sidebar" position="top" />
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
  );
});

export default ToolBar;

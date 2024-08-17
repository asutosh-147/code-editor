import { SupportedLangs } from "@/lib/constants";
import { themeAtom } from "@/store/atoms/theme";
import { useToggleTheme } from "@/store/hooks/toggleTheme";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { MdLightMode } from "react-icons/md";
import { useRecoilValue } from "recoil";
import Tooltip from "./ui/Tooltip";
import Button from "./ui/Button";
import Timer from "./Timer";
type ToolBarProps = {
  lang: SupportedLangs;
  setLang: Dispatch<SetStateAction<SupportedLangs>>;
  onSubmit: () => void;
};
const ToolBar = ({ lang, setLang, onSubmit }: ToolBarProps) => {
  const theme = useRecoilValue(themeAtom);
  const toggleTheme = useToggleTheme();
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
    <div className="flex w-full items-center justify-center gap-2 p-2 pt-5">
      <Timer/>
      <div className="group relative">
        <select
          name="Language"
          id="lang"
          className="scale-trans rounded-md bg-zinc-600 px-2 py-1 text-sm font-semibold capitalize outline-none transition-colors dark:bg-zinc-900"
          value={lang}
          onChange={(e) => {
            setLang(e.target.value as SupportedLangs);
          }}
        >
          <option className="bg-zinc-900" value="python">
            python
          </option>
          <option className="bg-zinc-900" value="javascript">
            javascript
          </option>
          <option className="bg-zinc-900" value="cpp">
            c++
          </option>
        </select>
        <Tooltip position="top" title="Language" />
      </div>
      <Button ref={runCodeRef} onClick={onSubmit}>
        <FaPlay className="text-xs" />
        <div>Run Code</div>
        <Tooltip title="Ctrl + '" position="top" />
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
};

export default ToolBar;

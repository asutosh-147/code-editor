import { SupportedLangs } from "@/lib/constants";
import { themeAtom } from "@/store/atoms/theme";
import { useToggleTheme } from "@/store/hooks/toggleTheme";
import { Dispatch, SetStateAction } from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { MdLightMode } from "react-icons/md";
import { useRecoilValue } from "recoil";
type ToolBarProps = {
  lang: SupportedLangs;
  setLang: Dispatch<SetStateAction<SupportedLangs>>;
  onSubmit: () => void;
};
const ToolBar = ({ lang, setLang, onSubmit }: ToolBarProps) => {
  const theme = useRecoilValue(themeAtom);
  const toggleTheme = useToggleTheme();
  return (
    <div className="flex items-center justify-center w-full gap-2 p-2">
      <select
        name="language"
        id="lang"
        className="dark:bg-zinc-900 bg-zinc-600 px-2 py-1 font-semibold rounded-md text-sm transition-colors scale-trans outline-none"
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
          cpp
        </option>
      </select>
      <button
        onClick={onSubmit}
        className="dark:bg-zinc-900 bg-zinc-600 font-semibold rounded-md text-sm px-2 py-1 flex items-center gap-2 scale-trans"
      >
        <FaPlay className="text-xs" />
        <div>Run Code</div>
      </button>
      <button
        className="text-lg dark:bg-zinc-900 bg-zinc-600 p-1 rounded-md shadow-sm scale-trans"
        onClick={toggleTheme}
      >
        {theme == "light" ? (
          <MdLightMode />
        ) : (
          <IoMdMoon className="text-zinc-200" />
        )}
      </button>
    </div>
  );
};

export default ToolBar;

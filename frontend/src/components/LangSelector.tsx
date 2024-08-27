import Tooltip from "./ui/Tooltip";
import { supportedlangs, SupportedLangsType } from "@/lib/constants";
import { useRecoilState } from "recoil";
import { langAtom } from "@/store/atoms/editor";

const LangSelector = () => {
  const [lang, setLang] = useRecoilState(langAtom);
  return (
    <div className="group relative">
      <select
        name="Language"
        id="lang"
        className="scale-trans rounded-md bg-zinc-600 px-2 py-1 text-sm font-semibold capitalize outline-none transition-colors dark:bg-zinc-900"
        value={lang}
        onChange={(e) => {
          setLang(e.target.value as SupportedLangsType);
          localStorage.setItem("lang",e.target.value);
        }}
      >
        {supportedlangs.map((lang) => {
          return (
            <option key={lang} className="bg-zinc-900" value={lang}>
              {lang}
            </option>
          );
        })}
      </select>
      <Tooltip position="top" title="Language" />
    </div>
  );
};

export default LangSelector;

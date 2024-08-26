import { backend_url, supportedlangs, SupportedLangsType } from "@/lib/constants";
import { editorValueAtom, langAtom } from "@/store/atoms/editor";
import axios from "axios";
import { ChangeEvent, memo } from "react";
import { useRecoilState } from "recoil";

const ConvertCode = memo(() => {
  const [selectedLang,setSelectedLang] = useRecoilState(langAtom);
  const [editorValue,setEditorValue] = useRecoilState(editorValueAtom);
  const handleConvertCode = async (e:ChangeEvent<HTMLSelectElement>) => {
    try {
      const selectedValue = e.target.value;
      const response = await axios.post(`${backend_url}/api/code/convert`,{
        code:editorValue,
        lang:selectedLang,
        convertLang:selectedValue
      },{withCredentials:true})
      if(response.status === 200){
        setSelectedLang(selectedValue as SupportedLangsType)
        setEditorValue(response.data.code);
      }
    } catch (error:any) {
      console.log(error.message);
    }
  };
  return (
    <select
      name="Language"
      id="lang"
      className="scale-trans rounded-md bg-zinc-600 px-2 py-1 text-sm font-semibold capitalize outline-none transition-colors dark:bg-zinc-900"
      value={"convert to"}
      onChange={handleConvertCode}
    >
      <option
        disabled
        className="bg-zinc-900 text-zinc-100 disabled:font-bold disabled:active:text-zinc-100"
        value="convert to"
      >
        convert to
      </option>
      {supportedlangs
        .filter((lang) => lang != selectedLang)
        .map((lang) => {
          return (
            <option key={lang} className="bg-zinc-900" value={lang}>
              {lang}
            </option>
          );
        })}
    </select>
  );
});

export default ConvertCode;

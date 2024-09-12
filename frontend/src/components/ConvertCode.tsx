import { backend_url, supportedlangs, SupportedLangsType } from "@/lib/constants";
import { codeAtomFamily, currentFileIdAtom, langAtom } from "@/store/atoms/editor";
import { useFileTree } from "@/store/hooks/useFileTree";
import axios from "axios";
import { ChangeEvent, memo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const ConvertCode = memo(() => {
  const [loading, setLoading] = useState(false);
  const [selectedLang,setSelectedLang] = useRecoilState(langAtom);
  const id = useRecoilValue(currentFileIdAtom);
  const [data,setData] = useRecoilState(codeAtomFamily(id!));
  const { updateNodeState } = useFileTree();
  const handleConvertCode = async (e:ChangeEvent<HTMLSelectElement>) => {
    try {
      if(!data?.code || data.code.length===0) return;
      setLoading(true);
      const selectedValue = e.target.value;
      const response = await axios.post(`${backend_url}/api/code/convert`,{
        fileId:id,
        code:data.code,
        lang:selectedLang,
        convertLang:selectedValue
      },{withCredentials:true})
      if(response.status === 200){
        setSelectedLang(selectedValue as SupportedLangsType)
        setData(prevData => {
          if(prevData){
            return {...prevData,code:response.data.code};
          }
          return null;
        });
        updateNodeState({...response.data.updatedFile,children:[]});
      }
    } catch (error:any) {
      console.log(error.message);
    } finally{
      setLoading(false);
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
        {
          loading ? "converting..." : "convert to"
        }
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

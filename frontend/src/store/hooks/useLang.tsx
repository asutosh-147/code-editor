import { useSetRecoilState } from "recoil"
import { langAtom } from "../atoms/editor"
import { SupportedLangsType } from "@/lib/constants";

export const useLang = () => {
    const setLang = useSetRecoilState(langAtom);
    const langMap = new Map<string,SupportedLangsType>([["js","javascript"],["cpp","cpp"],["py","python"]]);
    const setCodeLang = (name:string,isFile:boolean) => {
        if(!isFile) return;
        const extension = name.split('.')[1];
        if(!extension) return;
        if(langMap.get(extension) != undefined){
            setLang(langMap.get(extension)!);
        } 
        return;
    }
    return setCodeLang;
}
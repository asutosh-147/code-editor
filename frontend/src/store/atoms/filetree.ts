import { atom, selector } from "recoil";
import axios from "axios";
import { backend_url } from "@/lib/constants";
import { fileTreeType } from "@/lib/filesData";

export const fileTreeAtom = atom<fileTreeType>({
  key:"FileTreeAtom",
  default: selector({
    key:"FileTreeAtom/default",
    get:async () => {
      try {
        const response = await axios.get(`${backend_url}/api/file/filetree`,{
          withCredentials:true
        });
        if(response.status === 200){
          return response.data
        }
      } catch (error:any) {
        console.log(error.message);
      }
      return {};
    }
  })
})
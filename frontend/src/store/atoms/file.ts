import axios from "axios";
import { atom, selector } from "recoil";
import { userAtom } from "./user";
import { backend_url } from "@/lib/constants";

type AllFile = {
  id: string;
  fileName: string;
  code: string;
  lang: string;
  input: string;
  time: Date;
}[];
type File = AllFile[number];
export const allFilesAtom = atom<AllFile | null>({
  key: "AllFilesAtom",
  default: selector({
    key: "AllFilesSelector/default",
    get: async ({ get }) => {
      try {
        const user = get(userAtom);
        if (!user) return null;
        const response = await axios.get(`${backend_url}/api/file/allfiles`, {
          withCredentials: true,
        });
        if (response.status === 200) return response.data;
      } catch (error: any) {
        console.log(error.message);
      }
      return null;
    },
  }),
});

export const currFileSelector = selector<File | null>({
  key: "currFileSelector",
  get: ({ get }) => {
    const allFiles = get(allFilesAtom);
    if (allFiles && allFiles.length > 0) {
      return allFiles[0];
    }
    return null;
  },
});

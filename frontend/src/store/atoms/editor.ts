import { backend_url, SupportedLangsType } from "@/lib/constants";
import axios from "axios";
import { atom, atomFamily, selector, selectorFamily } from "recoil";

export const langAtom = atom<SupportedLangsType>({
  key: "langAtom",
  default: selector({
    key: "langSelector/default",
    get: () => {
      // const code = localStorage.getItem("lang") as SupportedLangsType;
      // if (code) return code;
      return "python";
    },
  }),
});

export const editorValueAtom = atom<string | undefined>({
  key: "editorValueAtom",
  default: selector({
    key: "editorValueSelector/default",
    get: () => {
      const code = localStorage.getItem("code");
      if (code) return code;
      return undefined;
    },
  }),
});

export const currentFileIdAtom = atom<number | null>({
  key: "currentFileIdAtom",
  default: null,
});

export type CodeAtomFamilyType = {
  id: string;
  fileId: number;
  code: string;
  input: string;
};

export const codeAtomFamily = atomFamily<CodeAtomFamilyType | null, number>({
  key: "codeAtomFamily",
  default: selectorFamily({
    key: "codeAtomFamily/Default",
    get: (id) => async () => {
      try {
        if (id === null) return null;
        const response = await axios.get(
          `${backend_url}/api/file/code?fileId=${id}`,
          { withCredentials: true },
        );
        if (response.status === 200) {
          return response.data as CodeAtomFamilyType;
        }
      } catch (error: any) {
        console.log(error);
      }
      return null;
    },
  }),
});

import { SupportedLangsType } from "@/lib/constants";
import { atom, selector } from "recoil";

export const langAtom = atom<SupportedLangsType>({
  key: "langAtom",
  default: selector({
    key: "langSelector/default",
    get: () => {
      const code = localStorage.getItem("lang") as SupportedLangsType;
      if (code) return code;
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

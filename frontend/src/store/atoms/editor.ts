import { SupportedLangsType } from "@/lib/constants";
import { atom } from "recoil";

export const langAtom = atom<SupportedLangsType>({
  key: "langAtom",
  default: "python",
});

export const editorValueAtom = atom<string | undefined>({
  key: "editorValueAtom",
  default: undefined,
});

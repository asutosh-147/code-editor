import { atom } from "recoil";

export const sideBarAtom = atom<boolean>({
    key:"sideBarAtom",
    default:false
})
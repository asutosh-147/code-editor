import { atom } from "recoil";

const getSavedTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme == "dark" || theme == "light") return theme;
  localStorage.setItem("theme", "dark");
  return "dark";
};
export const themeAtom = atom<"light" | "dark">({
  key: "themeAtom",
  default: getSavedTheme(),
});

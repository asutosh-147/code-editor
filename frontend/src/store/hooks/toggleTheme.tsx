import { useRecoilState } from "recoil";
import { themeAtom } from "../atoms/theme";

export const useToggleTheme = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);
  const toggleTheme = () => {
    const toggledValue = theme == "dark" ? "light" : "dark";
    if(toggledValue == "dark") document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    setTheme(toggledValue);
    localStorage.setItem("theme", toggledValue);
  };
  return toggleTheme;
};

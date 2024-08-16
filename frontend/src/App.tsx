import { RecoilRoot } from "recoil";
import CodeIDE from "./components/CodeIDE";
import "./index.css"
import { useEffect } from "react";
const App = () => {
  return (
    <RecoilRoot>
      <AuthApp />
    </RecoilRoot>
  );
};
const AuthApp = () => {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if(theme=="dark") document.documentElement.classList.add("dark");
  }, [])
  
  return <CodeIDE />;
};
export default App;

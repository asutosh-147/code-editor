import Explorer from "./Explorer";
import CodeIDE from "./CodeIDE";
import { useRecoilValue } from "recoil";
import { currentFileIdAtom } from "@/store/atoms/editor";
import { AnimatePresence } from "framer-motion";
import { sideBarAtom } from "@/store/atoms/sidebar";
import IdleWindow from "./IdleWindow";
import { useUser } from "@/store/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Editor = () => {
  const id = useRecoilValue(currentFileIdAtom);
  const isSideBarOpen = useRecoilValue(sideBarAtom);
  const user = useUser();
  console.log(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div className="">
      <AnimatePresence>{isSideBarOpen && <Explorer />}</AnimatePresence>
      {id ? <CodeIDE id={id} /> : <IdleWindow/>}
    </div>
  );
};

export default Editor;

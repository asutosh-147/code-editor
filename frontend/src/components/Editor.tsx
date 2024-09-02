import Explorer from "./Explorer";
import CodeIDE from "./CodeIDE";
import { useRecoilValue } from "recoil";
import { currentFileIdAtom } from "@/store/atoms/editor";
import { AnimatePresence } from "framer-motion";
import { sideBarAtom } from "@/store/atoms/sidebar";

const Editor = () => {
  const id = useRecoilValue(currentFileIdAtom);
  const isSideBarOpen = useRecoilValue(sideBarAtom);
  return (
    <>
      <AnimatePresence>{isSideBarOpen && <Explorer />}</AnimatePresence>
      {id && <CodeIDE id={id} />}
    </>
  );
};

export default Editor;

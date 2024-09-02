import { useFileTree } from "@/store/hooks/useFileTree";
import FileTree from "./fileTree/FileTree";
import { motion, Variants } from "framer-motion";
const sideBarVariant: Variants = {
  hidden: {
    opacity: 1,
    x: -300,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: { x: -300, opacity: 0 },
};
const Explorer = () => {
  const { fileTreeData, insertNodeState, deleteNodeState, updateNodeState } =
    useFileTree();
  return (
      <motion.div
        variants={sideBarVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ delay: 0.1, type: "spring", mass: 0.32 }}
        className="fixed left-0 z-50 h-screen w-64 space-y-3 rounded-r-md border-r border-zinc-300 py-2 shadow-2xl backdrop-blur-xl dark:border-zinc-600"
      >
        <FileTree
          data={fileTreeData}
          insertNode={insertNodeState}
          deleteNode={deleteNodeState}
          updateNode={updateNodeState}
        />
      </motion.div>
  );
};

export default Explorer;

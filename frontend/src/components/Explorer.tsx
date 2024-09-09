import { useFileTree } from "@/store/hooks/useFileTree";
import FileTree from "./fileTree/FileTree";
import { motion, Variants } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { userAtom } from "@/store/atoms/user";
import { backend_url } from "@/lib/constants";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";
import { currentFileIdAtom } from "@/store/atoms/editor";
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
  const setUser = useSetRecoilState(userAtom);
  const setCurrentFileId = useSetRecoilState(currentFileIdAtom);
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/auth/logout`, {
        withCredentials: true,
      });
      if (response.status === 200){
        setCurrentFileId(null);
        setUser(null);
      } 
    } catch (error: any) {
      console.log("error in logging out", error.message);
    }
  };
  return (
    <motion.div
      variants={sideBarVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ delay: 0.1, type: "spring", mass: 0.32 }}
      className="fixed left-0 z-50 flex h-screen w-64 flex-col justify-between space-y-3 rounded-r-md border-r border-zinc-300 py-2 shadow-2xl backdrop-blur-xl dark:border-zinc-600"
    >
      <FileTree
        data={fileTreeData}
        insertNode={insertNodeState}
        deleteNode={deleteNodeState}
        updateNode={updateNodeState}
      />
      <div
        onClick={handleLogout}
        className="flex w-full cursor-pointer items-center justify-center gap-4 self-end rounded-sm p-2 font-bold tracking-wider text-zinc-950 transition-all duration-300 hover:bg-zinc-300 dark:text-zinc-200 hover:dark:bg-zinc-600"
      >
        <FiLogOut className="text-xl" />
        Logout
      </div>
    </motion.div>
  );
};

export default Explorer;

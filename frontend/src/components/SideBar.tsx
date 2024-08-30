import axios from "axios";
import { backend_url } from "@/lib/constants";
import { sideBarAtom } from "@/store/atoms/sidebar";
import { userAtom } from "@/store/atoms/user";
import { motion, Variants } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";

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
const SideBar = () => {
  const setUser = useSetRecoilState(userAtom);
  const setSideBar = useSetRecoilState(sideBarAtom);
  const handleLogout = async () =>{
    try {
      const response = await axios.get(`${backend_url}/api/auth/logout`, {
        withCredentials: true,
      });
      if (response.status === 200) setUser(null);
    } catch (error: any) {
      console.log("error in logging out", error.message);
    }
  }
  return (
    <motion.div
      variants={sideBarVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{delay:0.1,type:"spring",mass:0.32}}
      className="fixed left-0 z-50 h-screen w-64 space-y-3 rounded-r-md  py-2 shadow-2xl backdrop-blur-xl border-r border-zinc-300 dark:border-zinc-600"
    >
      <div className="border-b border-zinc-400 pb-2 text-center text-2xl font-bold text-zinc-950 dark:text-zinc-200 relative">
        <Link to={"/"}>
          CheatCode
        </Link>
        <button onClick={()=>{setSideBar(false)}} className="absolute top-0 left-1 font-light text-[1.6rem] hover:bg-zinc-400 dark:hover:bg-zinc-600 rounded-full p-1 duration-300 transition-all"><IoClose /></button>
      </div>
      <div className="flex w-full flex-col items-center justify-between gap-2 text-lg font-semibold">
        <div onClick={handleLogout} className="flex w-full cursor-pointer items-center justify-center gap-2 self-end rounded-sm p-1 tracking-wide text-zinc-950 dark:text-zinc-200 transition-all duration-300 hover:bg-zinc-300 hover:dark:bg-zinc-600">
          <FiLogOut className="text-xl" />
          Logout
        </div>
      </div>
    </motion.div>
  );
};

export default SideBar;

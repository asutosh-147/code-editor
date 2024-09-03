import { BsFillFileEarmarkCodeFill } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import { LuFilePlus } from "react-icons/lu";
const IdleWindow = () => {
  return (
    <div className="fixed left-1/2 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2 dark:text-zinc-400">
      <BsFillFileEarmarkCodeFill className="text-[10rem] dark:text-zinc-500" />
      <div className="flex items-center gap-2 pt-3 text-2xl font-bold capitalize ">
      <LuFilePlus /> create a new file
      </div>
      <div className="font-medium">Or</div>
      <div className="flex items-center gap-2 text-2xl font-bold capitalize">
      <FaRegFileAlt /> Open existing one
      </div>
    </div>
  );
};

export default IdleWindow;

import { Link, useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { useUser } from "@/store/hooks/useUser";
import { useSetRecoilState } from "recoil";
import { userAtom } from "@/store/atoms/user";
import axios from "axios";
import { backend_url } from "@/lib/constants";

const Navbar = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const user = useUser();

  const handleLogOut = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/auth/logout`, {
        withCredentials: true,
      });
      if (response.status === 200) setUser(null);
    } catch (error: any) {
      console.log("error in logging out", error.message);
    }
  };
  return (
    <div className="flex w-full items-center justify-between bg-zinc-800 p-4 px-5 shadow-md">
      <Link
        to={"/"}
        className="flex items-center gap-3 text-3xl font-bold text-zinc-100"
      >
        <img src="/cheatcode.jpg" alt="logo" className="size-8 rounded-full" />
        <div>CheatCode</div>
      </Link>
      <div>
        {!user && (
          <Button
            className="p-2 font-bold bg-zinc-100 dark:bg-zinc-100"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        )}
        {user && (
          <Button
            className="p-2 font-bold bg-zinc-100 dark:bg-zinc-100"
            onClick={handleLogOut}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

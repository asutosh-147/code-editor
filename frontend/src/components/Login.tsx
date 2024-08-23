import { FiMail } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import Input from "./ui/Input";
import axios from "axios";
import { backend_url } from "@/lib/constants";
import { useUser } from "@/store/hooks/useUser";
import { useSetRecoilState } from "recoil";
import { userAtom } from "@/store/atoms/user";
type User = {
  email: string;
  password: string;
};
const Login = () => {
  const user = useUser();
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState<User>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as "email" | "password";
    const value = e.target.value as string;
    setUserInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${backend_url}/api/auth/login`,{
        email:userInfo.email,
        password:userInfo.password,
      },{
        withCredentials:true,
      })
      if(response.status === 200){
        setUser(response.data);
        navigate("/editor")
      }
    } catch (error:any) {
      console.log(error.message) 
    }
  }
  useEffect(()=>{
    if(user) navigate("/editor");
  },[user,navigate])
  return (
    <div className="mt-10 flex w-full items-center justify-center">
      <div className="grid grid-cols-2 rounded-xl bg-zinc-300">
        <img src="/authImage.png" alt="authimage" className="w-auto max-w-72" />
        <div className="flex w-72 flex-col items-center justify-around gap-10 px-9 pt-6">
          <div className="text-3xl font-bold">Login</div>
          <div className="flex flex-col items-start gap-3">
            <Input
              type="email"
              name="email"
              value={userInfo.email}
              label="Email"
              onChange={handleChange}
            >
              <FiMail className="absolute left-2 top-2" />
            </Input>
            <Input
              type={`${visible ? "text" : "password"}`}
              name="password"
              label="Password"
              value={userInfo.password}
              onChange={handleChange}
            >
              <MdLockOutline className="absolute left-2 top-2" />
              {visible ? (
                <LuEye
                  className="absolute right-2 top-2"
                  onClick={() => setVisible((prev) => !prev)}
                />
              ) : (
                <LuEyeOff
                  className="absolute right-2 top-2"
                  onClick={() => setVisible((prev) => !prev)}
                />
              )}
            </Input>
          </div>
          <Button className="text-white w-full justify-center" onClick={handleSubmit}>Submit</Button>
          <div className="text-xs">
            Already have an Account?{" "}
            <Link to={"/signup"}>
              <b>SignUp</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
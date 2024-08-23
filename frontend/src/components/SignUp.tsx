import { RiUserLine } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { useUser } from "@/store/hooks/useUser";
import { backend_url } from "@/lib/constants";
import axios from "axios";
type User = {
  name: string;
  email: string;
  password: string;
};
const SignUp = () => {
  const user = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/editor");
  }, [user, navigate]);

  const [emailSent, setEmailSent] = useState(false);
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as "name" | "email" | "password";
    const value = e.target.value as string;
    setUserInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${backend_url}/api/auth/signup`,
        {
          ...userInfo,
        },
        {
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        setEmailSent(true);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="mt-10 flex w-full items-center justify-center">
      {!emailSent ? (
        <div className="grid grid-cols-2 rounded-xl bg-zinc-300">
          <img
            src="/authImage.png"
            alt="authimage"
            className="w-auto max-w-72"
          />
          <div className="flex w-72 flex-col items-center gap-10 px-9 pt-6">
            <div className="text-3xl font-bold">Signup</div>
            <div className="flex flex-col items-start gap-3">
              <Input
                value={userInfo.name}
                type="text"
                name="name"
                label="Username"
                onChange={handleChange}
              >
                <RiUserLine className="absolute left-2 top-2" />
              </Input>
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
            <Button
              className="w-full justify-center text-white"
              onClick={handleSubmit}
            >
              Signup
            </Button>
            <div className="text-xs">
              Already have an Account?{" "}
              <Link to={"/login"}>
                <b>Login</b>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>Please Check your email and verify!!!</div>
      )}
    </div>
  );
};

export default SignUp;

import { RiUserLine } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useState } from "react";
// import { Link } from "react-router-dom";
import Button from "./ui/Button";
import Input from "./ui/Input";
type User = {
  username: string;
  email: string;
  password: string;
};
const SignUp = () => {
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as "username" | "email" | "password";
    const value = e.target.value as string;
    setUserInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <div className="mt-10 flex w-full items-center justify-center">
      <div className="grid grid-cols-2 rounded-xl bg-zinc-400">
        <img src="/authImage.png" alt="authimage" className="w-auto max-w-72" />
        <div className="flex w-72 flex-col items-center gap-10 px-9 pt-6">
          <div className="text-3xl font-bold">Signup</div>
          <div className="flex flex-col items-start gap-3">
            <Input
              value={userInfo.username}
              type="text"
              name="username"
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
          <Button className="text-white w-full justify-center">Submit</Button>
          <div className="text-xs">
            Already have an Account?{" "}
            {/* <Link to={"/signin"}> */}
              <b>Login</b>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
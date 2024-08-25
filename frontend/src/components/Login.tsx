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
import { useForm } from "react-hook-form";
import { signInSchema,signInType } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "./FormError";
import { toast } from "sonner";
const Login = () => {
  const user = useUser();
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signInType>({
    resolver: zodResolver(signInSchema),
  });
  const [visible, setVisible] = useState(false);

  const handleFormSubmit = async (userInfo:signInType) => {
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
      toast(error.response.data.error);
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (user) navigate("/editor");
  }, [user, navigate]);
  return (
    <div className="flex w-full items-center justify-center pt-10">
      <div className="flex rounded-xl shadow-2xl bg-zinc-300">
        <img src="/authImage.jpg" alt="authimage" className="w-[35rem] flex-1 rounded-l-md" />
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex w-max flex-col items-center justify-around gap-10 px-9 pt-6"
        >
          <div className="text-3xl font-bold">Login</div>
          <div className="flex flex-col items-start gap-3">
            <Input
              {...register("email")}
              type="email"
              name="email"
              label="Email"
            >
              <FiMail className="absolute left-2 top-2" />
            </Input>
            <Input
              type={`${visible ? "text" : "password"}`}
              {...register("password")}
              name="password"
              label="Password"
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
          <div>
            {errors.email && <FormError error={errors.email.message} />}
            {errors.password && <FormError error={errors.password.message}/>}
          </div>
          <Button
            className="w-full justify-center text-white"
            type="submit"
            loading={isSubmitting}
          >
            Submit
          </Button>
          <div className="text-xs">
            Already have an Account?{" "}
            <Link to={"/signup"}>
              <b>SignUp</b>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

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
import { signUpSchema, signUpType } from "@/lib/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "./FormError";
const SignUp = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [visible, setVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signUpType>({
    resolver: zodResolver(signUpSchema),
  });
  const handleSignUp = async (userInfo: signUpType) => {
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
      toast(error.response.data.error);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user) navigate("/editor");
  }, [user, navigate]);
  return (
    <div className="flex w-full items-center justify-center pt-10">
      {!emailSent ? (
        <div className="flex rounded-xl bg-zinc-300 shadow-2xl">
          <img src="/authImage.jpg" alt="authimage" className="w-[40rem] flex-1 rounded-l-md" />
          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="flex w-72 flex-col items-center justify-around gap-8 px-9 pt-5"
          >
            <div className="text-3xl font-bold">Signup</div>
            <div className="flex flex-col items-start gap-3">
              <Input
                {...register("name")}
                type="text"
                name="name"
                label="Username"
              >
                <RiUserLine className="absolute left-2 top-2" />
              </Input>
              <Input
                {...register("email")}
                required
                type="email"
                name="email"
                label="Email"
              >
                <FiMail className="absolute left-2 top-2" />
              </Input>
              <Input
                {...register("password")}
                type={`${visible ? "text" : "password"}`}
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
              {errors.name && <FormError error={errors.name.message} />}
              {errors.email && <FormError error={errors.email.message} />}
              {errors.password && <FormError error={errors.password.message} />}
            </div>
            <Button
              className="w-full justify-center text-white"
              type="submit"
              loading={isSubmitting}
            >
              Signup
            </Button>
            <div className="text-xs">
              Already have an Account?{" "}
              <Link to={"/login"}>
                <b>Login</b>
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-md bg-zinc-200 p-10 text-center font-bold capitalize">
          We have sent you a verification email please check and verify!!! <br />
          (if not found check in spam folder)
        </div>
      )}
    </div>
  );
};

export default SignUp;

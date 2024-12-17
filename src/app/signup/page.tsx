"use client";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAppSelector } from "@/lib/hooks";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "@/utils/helper";

interface ISignUpProps {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
}

const SignUp: React.FunctionComponent = () => {
  const router = useRouter();
  const [dataRegis, setDataRegis] = useState<ISignUpProps>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "author",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);

  React.useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) {
    return null;
  }

  const onHandleRegis = async () => {
    try {
      if (Object.values(dataRegis).includes("")) {
        toast.error("Please input all your data");
        return;
      }
      if (dataRegis.password !== dataRegis.confirmPassword) {
        toast.error("Confirm password is not matched");
        return;
      }
      const { username, email, password, role } = dataRegis;
      const response = await axios.post(
        `${BASE_URL}/auth/regis`,
        {
          username,
          email,
          password,
          role,
        }
      );
      console.log("Response Regis: ", response.data);//escape-structure-film-sol.trycloudflare.com
      https: toast.success("Registration successful. You can now log in.");
      router.replace("/signin");
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-orange-200">
      <div className="md:flex-1 flex justify-center items-center md:ml-48">
        <div className="hidden md:flex md:flex-col justify-center items-center tex border-2 border-gray-400 bg-purple-500 h-[500px] w-[350px]">
          <img
            src="https://ashecone.github.io/web-blog/logo.png"
            alt="Logo"
            style={{ maxWidth: "250px", height: "auto" }}
          />
          <img
            src="https://ashecone.github.io/web-blog/signup.png"
            alt="Sign up"
            style={{ maxWidth: "250px", height: "auto" }}
          />
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center md:mr-48 p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-black text-center">
            Form Registration
          </h1>
          <p className="text-black font-bold">Username</p>
          <input
            type="username"
            onChange={(e: any) => {
              const newData = { ...dataRegis, username: e.target.value };
              setDataRegis(newData);
            }}
            className="text-black border border-gray-400 rounded-md h-10 w-full mb-2 p-2"
          />
          <p className="text-black font-bold">Email</p>
          <input
            type="email"
            onChange={(e: any) => {
              const newData = { ...dataRegis, email: e.target.value };
              setDataRegis(newData);
            }}
            className="text-black border border-gray-400 rounded-md h-10 w-full mb-2 p-2"
          />
          <p className="text-black font-bold">Password</p>
          <div className="flex mb-2">
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e: any) => {
                const newData = {
                  ...dataRegis,
                  confirmPassword: e.target.value,
                };
                setDataRegis(newData);
              }}
              className="text-black border border-gray-400 rounded-md w-full h-10 mr-2 p-2"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="border border-gray-400 rounded-md text-black w-20 bg-white h-10"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <p className="text-black font-bold">Confirm Password</p>
          <input
            type="password"
            onChange={(e: any) => {
              const newData = { ...dataRegis, password: e.target.value };
              setDataRegis(newData);
            }}
            className="text-black border border-gray-400 rounded-md h-10 w-full mb-2 p-2"
          />{" "}
          <br />
          <div className="flex justify-center">
            <button
              type="button"
              className="border border-gray-400 rounded-md text-black font-bold h-10 w-32 bg-white hover:bg-gray-500 hover:text-white transition duration-300"
              onClick={onHandleRegis}
            >
              Submit
            </button>
          </div>
          <p className="mt-4 text-black text-center">
            Already have an account?{" "}
            <span
              className="underline text-black hover:text-blue-500 cursor-pointer"
              onClick={() => router.push("/signin")}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;

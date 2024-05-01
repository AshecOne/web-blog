"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/helper";
import { useAppDispatch } from "@/lib/hooks";
import { setSuccessLogin } from "@/lib/features/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ISignInProps {
  emailOrUsername: string;
  password: string;
}

const SignIn: React.FunctionComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);

  React.useEffect(() => {
    if (isLoggedIn && typeof window !== "undefined") {
      setTimeout(() => {
        router.replace("/");
      }, 2500);
    }
  }, [isLoggedIn, router]);

  const [dataInput, setDataInput] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onHandleLogin = async () => {
    try {
      if (dataInput.emailOrUsername === "" || dataInput.password === "") {
        throw new Error("Email or username and password are required");
      }
      console.log("Email or Username:", dataInput.emailOrUsername);
      console.log("Password:", dataInput.password);
      const response = await axios.post(BASE_URL + `/auth/signin`, {
        emailOrUsername: dataInput.emailOrUsername,
        password: dataInput.password,
      });
      console.log(response.data);
      if (response.data.success) {
        const user = response.data.data;
        const token = response.data.token;
        if (user && token) {
          const { username, email } = user;
          toast.success(`Welcome, ${username}`);
          if (typeof window !== "undefined") {
            localStorage.setItem("user-token", token);
          }
          dispatch(
            setSuccessLogin({
              id: user.id,
              username: user.username,
              email: user.email,
            })
          );
        }
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      alert(error);
      setDataInput({ emailOrUsername: "", password: "" });
    }
  };

  if (isLoggedIn) {
    return null;
  }
  return (
    <div className="flex flex-col md:flex-row h-screen bg-orange-200">
  <div className="flex-1 flex justify-center items-center md:ml-48 p-4">
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-black text-center">Log in to your account</h1>
      <p className="text-black font-bold">Email or Username</p>
      <input
        type="text"
        value={dataInput.emailOrUsername}
        onChange={(e: any) => {
          const newData = { ...dataInput, emailOrUsername: e.target.value };
          setDataInput(newData);
        }}
        className="text-black border border-gray-400 rounded-md h-10 w-full mb-2 p-2"
      />
      <p className="text-black font-bold">Password</p>
      <div className="flex mb-2">
        <input
          type={showPassword ? "text" : "password"}
          value={dataInput.password}
          onChange={(e: any) => {
            const newData = { ...dataInput, password: e.target.value };
            setDataInput(newData);
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
      <div className="flex justify-center">
        <button
          type="button"
          className="border border-gray-400 rounded-md text-black font-bold h-10 w-32 bg-white hover:bg-gray-500 hover:text-white transition duration-300"
          onClick={onHandleLogin}
        >
          Log In
        </button>
      </div>
      <p className="mt-4 text-black text-center">
        Don't have an account?{" "}
        <span
          className="underline text-blue-500 cursor-pointer"
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </span>
      </p>
    </div>
  </div>
  <div className="md:flex-1 flex justify-center items-center md:mr-48">
  <div className="hidden md:flex md:flex-col justify-center items-center tex border-2 border-gray-400 bg-purple-500 h-[500px] w-[350px]">
          <img
            src="https://ashecone.github.io/web-blog/logo.png"
            alt="Logo"
            style={{ maxWidth: "250px", height: "auto" }}
          />
          <img
            src="/signin.png"
            alt="Sign in"
            style={{ maxWidth: "250px", height: "auto" }}
          />
        </div>
  </div>
  <ToastContainer />
</div>
  );
};

export default SignIn;

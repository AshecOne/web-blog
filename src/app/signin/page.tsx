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
import ClipLoader from "react-spinners/ClipLoader";

interface ISignInProps {
  emailOrUsername: string;
  password: string;
}

const SignIn: React.FunctionComponent<ISignInProps> = (props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);

  if (isLoggedIn) {
    React.useEffect(() => {
      setTimeout(() => {
        router.replace("/");
      }, 2500);
    }, [router]);
  }

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
          localStorage.setItem("user-token", token);
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
    <div className="flex h-screen bg-orange-200">
      <div className="flex-1 flex justify-center items-center ml-48">
        <div>
          <h1 className="text-2xl font-bold mb-4 text-black">
            Log in to your account
          </h1>
          <p className="text-black font-bold">Email or Username</p>
          <input
            type="text"
            value={dataInput.emailOrUsername}
            onChange={(e: any) => {
              const newData = { ...dataInput, emailOrUsername: e.target.value };
              setDataInput(newData);
            }}
            className="text-black border border-gray-400 rounded-md h-10 w-[300px] mb-2 p-2"
          />
          <p className="text-black font-bold">Password</p>
          <div className="flex mb-2">
            <input
              type={showPassword ? "text" : "password"}
              value={dataInput.password}
              onChange={(e: any) => {
                const newData = {
                  ...dataInput,
                  password: e.target.value,
                };
                setDataInput(newData);
              }}
              className="text-black border border-gray-400 rounded-md w-[300px] h-10 mr-2 p-2"
            />

            <button
              onClick={() => setShowPassword(!showPassword)}
              className="border border-gray-400 rounded-md text-black w-20 bg-white h-10"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="button"
            className="border border-gray-400 rounded-md text-black font-bold h-10 w-32 bg-white hover:bg-gray-500 hover:text-white transition duration-300"
            onClick={onHandleLogin}
          >
            Log In
          </button>
          <p className="mt-4 text-black">
            Don&apos;t have an account?
            <span
              className="underline text-blue-500 cursor-pointer pl-1"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center mr-48">
        <div className="border-2 border-gray-400 bg-purple-500 h-[500px] w-[350px]" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;

"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/helper";
import { useAppDispatch } from "@/lib/hooks";
import { setSuccessLogin } from "@/lib/features/userSlice";
import { useAppSelector } from "@/lib/hooks";

interface ISignInProps {
  email: string;
  password: string;
}

const SignIn: React.FunctionComponent<ISignInProps> = (props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);

  React.useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  const [dataInput, setDataInput] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onHandleLogin = async () => {
    try {
      if (dataInput.email === "" || dataInput.password === "") {
        throw new Error("Email and password are required");
      }

      const isEmailTrue = await checkEmail();
      if (!isEmailTrue) {
        alert("Email tidak terdaftar.");
        setDataInput({ email: "", password: "" });
        return;
      }
      const response = await axios.get(
        BASE_URL +
          `/user?email=${dataInput.email}&password=${dataInput.password}`
      );
      console.log(response.data);

      if (response.data.length > 0) {
        const user = response.data[0];
        if (user) {
          const username = user.username;
          alert(`Welcome, ${username}`);
          // data respon disimpan ke gloal state redux
          dispatch(setSuccessLogin(response.data[0]));
          router.replace("/");
        }
      } else {
        throw new Error("Email and password is not matched");
        setDataInput({ email: "", password: "" });
      }
    } catch (error) {
      alert(error);
      setDataInput({ email: "", password: "" });
    }
  };

  const checkEmail = async () => {
    try {
      const response = await axios.get(
        BASE_URL + `/user?email=${dataInput.email}`
      );
      return response.data.length > 0;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="flex h-screen bg-orange-200">
      <div className="flex-1 flex justify-center items-center ml-48">
        <div>
          <h1 className="text-2xl font-bold mb-4 text-black">
            Log in to your account
          </h1>
          <p className="text-black font-bold">Email</p>
          <input
            type="email"
            value={dataInput.email}
            onChange={(e: any) => {
              const newData = {
                ...dataInput,
                email: e.target.value,
              };
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
            Don't have an account?
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
    </div>
  );
};

export default SignIn;

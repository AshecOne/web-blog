"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/utils/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmailPage: React.FunctionComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/verify-token/${token}`);
        setIsTokenValid(response.data.isValid);
      } catch (error) {
        console.error(error);
        setIsTokenValid(false);
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  const handleVerifyEmail = async () => {
    setIsVerifying(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/verify-email/${token}`,
        { otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Email verified successfully. You can now log in.");
      router.push("/signin");
    } catch (error) {
      console.error(error);
      toast.error("Invalid verification OTP.");
      setIsVerifying(false);
    }
  };

  if (!isTokenValid) {
    return <div>Invalid token</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
        </div>
        <div className="mt-8 flex justify-center space-x-6">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <button
            onClick={handleVerifyEmail}
            disabled={isVerifying}
            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isVerifying ? "Verifying..." : "Verify Email"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifyEmailPage;

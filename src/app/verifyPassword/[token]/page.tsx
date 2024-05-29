import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL } from "@/utils/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface VerifyPasswordProps {
  isTokenValid: boolean;
  token: string;
}

const VerifyPassword: React.FunctionComponent<VerifyPasswordProps> = ({
  isTokenValid,
  token,
}) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/verify-password/${token}`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Password reset successfully. You can now log in.");
      router.push("/signin");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  if (!isTokenValid) {
    return <div>Invalid token</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <button
          onClick={handleResetPassword}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Reset Password
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { token } = context.params;

  try {
    const response = await axios.get(`${BASE_URL}/auth/verify-token/${token}`);
    const isTokenValid = response.data.isValid;
    return {
      props: {
        isTokenValid,
        token,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        isTokenValid: false,
        token,
      },
    };
  }
}

export default VerifyPassword;

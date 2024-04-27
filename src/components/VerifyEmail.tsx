import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BASE_URL } from '@/utils/helper';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmail: React.FunctionComponent = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/auth/verify-email?token=${token}`
        );
        console.log("Email verification response: ", response.data);
        toast.success("Email verified successfully. You can now log in.");
        router.push("/signin");
      } catch (error) {
        console.log(error);
        alert("Invalid verification token.");
        router.push("/signup");
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, router]);

  return (
    <div>
      <h1>Verifying email...</h1>
      <ToastContainer />
    </div>
  );
};

export default VerifyEmail;

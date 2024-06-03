"use client";
import React, { ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

const Auth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();
    const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);

    React.useEffect(() => {
      if (!isLoggedIn) {
        router.replace("/signin");
      }
    }, [isLoggedIn, router]);

    return isLoggedIn ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default Auth;
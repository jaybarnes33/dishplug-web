import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

import { useAuth } from "../Context/Auth";

const Auth = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const redirect = new URLSearchParams(window.location.search).get(
      "redirect"
    );
    if (isAuthenticated || user) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isAuthenticated, router, user]);
  return (
    <>
      {!isAuthenticated ? (
        <div>{children}</div>
      ) : (
        <div className="loader-wrapper">loading...</div>
      )}
    </>
  );
};

export default Auth;

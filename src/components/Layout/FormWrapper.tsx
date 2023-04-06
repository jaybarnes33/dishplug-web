import React, { ReactNode, useEffect, useState } from "react";

import styles from "@/styles/form.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { referrerdb } from "@/pages/_app";
import Auth from "../Auth/Auth";

const FormWrapper = ({ children }: { children: ReactNode }) => {
  const { pathname, back } = useRouter();
  const [referred, setReferred] = useState(false);

  useEffect(() => {
    referrerdb.getItem("referrer").then(() => setReferred(true));
  }, []);
  return (
    <Auth>
      <Head>
        <title>{pathname === "/login" ? "Login" : "Register"}</title>
      </Head>

      <p
        className="text-xl absolute top-5 hover:text-accent"
        onClick={() => back()}
      >
        &larr; Go back
      </p>
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen items-center ">
        <div className="desktop-only px-5 hidden md:block md:col-span-5">
          <div className={styles.imgWrapper}>
            <p>Order food and have it delivered to your doorstep in minutes</p>
          </div>
        </div>
        <div className={`px-5 col-span-7 flex w-full items-center `}>
          <div className="w-full  xs:border xs:shadow md:border-none md:shadow-none   mt-5 p-5">
            <div className="mb-4 text-center">
              <h1 className="text-2xl font-bold">
                {pathname === "/login"
                  ? "Welcome Back"
                  : !referred || pathname !== "/refer"
                  ? "Get Started"
                  : "Claim your discount"}
              </h1>
              <p>
                Please enter your details to{" "}
                {pathname.includes("login") || pathname.includes("refer")
                  ? "log into your account"
                  : "create an account"}
              </p>
            </div>

            {children}
            <div className={styles.continueWith}>
              {/* Or continue with */}
              {/* <div
                className={`${styles.buttons} buttons flex gap-3 justify-content-center`}
              >
                <Image
                  width={35}
                  height={35}
                  src="/google.png"
                  alt="google"
                  quality={100}
                />

                <Image
                  width={35}
                  height={35}
                  src="/facebook.png"
                  alt="facebook"
                  quality={100}
                />
              </div> */}
              <div className="mt-3">
                {pathname.includes("login") || pathname.includes("refer") ? (
                  <p>
                    Don&apos;t have an account?{" "}
                    <span className="text-primary hover:text-primary2">
                      <Link href="/register">Sign up</Link>
                    </span>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <span className="text-primary">
                      <Link href="/login">Sign in</Link>
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Auth>
  );
};

export default FormWrapper;

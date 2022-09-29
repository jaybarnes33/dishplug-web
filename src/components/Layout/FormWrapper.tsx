import React, { ReactNode, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "@/styles/form.module.scss";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { ref } from "firebase/storage";
import { referrerdb } from "@/pages/_app";

const FormWrapper = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter();
  const [referred, setReferred] = useState(false);
  useEffect(() => {
    referrerdb.getItem("referrer").then(() => setReferred(true));
  }, []);
  return (
    <>
      <Head>
        <title>{pathname === "/login" ? "Login" : "Register"}</title>
      </Head>
      <>
        <Row className={styles.formWrapper}>
          <Col md={6} className="desktop-only px-5">
            <div className={styles.imgWrapper}>
              <p>
                Order food and have it delivered to your doorstep in minutes
              </p>
            </div>
          </Col>
          <Col sm={12} md={6} className={`px-5 ${styles.form} mt-5 pt-5`}>
            <div className="mb-4">
              <h1>
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
                className={`${styles.buttons} buttons d-flex gap-3 justify-content-center`}
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
                    <span className="text-primary">
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
          </Col>
        </Row>
      </>
    </>
  );
};

export default FormWrapper;

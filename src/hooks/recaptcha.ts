import { useEffect, useState } from "react";
import type { ApplicationVerifier, ConfirmationResult } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export const useRecaptcha = () => {
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [appVerifier, setAppVerifier] = useState<ApplicationVerifier | null>(
    null
  );
  const [recaptchaResponse, setRecaptchaResponse] = useState<unknown>(null);

  useEffect(() => {
    if (!appVerifier) {
      const verifier = new RecaptchaVerifier(
        "submit-button",
        {
          size: "invisible",
          callback: (response: unknown) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            setRecaptchaResponse(response);
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
            console.log("captcha expired");
          }
        },
        auth
      );

      setAppVerifier(verifier);
    }
  }, [appVerifier]);

  return {
    appVerifier,
    recaptchaResponse,
    confirmationResult,
    setConfirmationResult
  };
};

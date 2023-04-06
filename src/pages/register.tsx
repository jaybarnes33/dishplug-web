import * as Yup from "yup";
import { FormikConfig, useFormik } from "formik";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import "yup-phone-lite";
import FormWrapper from "@/components/Layout/FormWrapper";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRecaptcha } from "@/hooks/recaptcha";
import { AuthError } from "@/helpers/constructors";

import { useCallback, useEffect, useState } from "react";

import { formatPhone } from "@/helpers/utils";
import { referrerdb } from "./_app";
import Input from "@/components/Core/Input";

const initialValues = {
  name: "",

  phone: "",
  password: ""
};

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2).required().label("First name"),

  phone: Yup.string()
    .phone("GH", "Please enter a valid phone number")
    .required()
    .label("Phone Number"),
  password: Yup.string()
    .min(8)
    .required("Password field can't be empty")
    .label("Password")
});

const Register = () => {
  const { appVerifier, recaptchaResponse } = useRecaptcha();
  const [verificationId, setVerificationId] = useState("");
  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [referrer, setReferrer] = useState("");

  useEffect(() => {
    referrerdb
      .getItem("referrer")
      .then(val => setReferrer(val as unknown as string));
  }, []);
  useEffect(() => {
    if (recaptchaResponse) {
      const otp = window.prompt(
        "Check your messages and enter the code your received"
      );
      if (otp) {
        setOtp(otp);
      }
    }
  }, [recaptchaResponse]);

  const onSubmit: FormikConfig<typeof initialValues>["onSubmit"] = async (
    values,
    actions
  ) => {
    try {
      if (!appVerifier) {
        throw new Error(
          "Something went wrong, Please refresh the page and try again"
        );
      }

      // 'recaptcha-container' is the ID of an element in the DOM.
      const provider = new PhoneAuthProvider(auth);
      const verificationId = await provider.verifyPhoneNumber(
        formatPhone(values.phone),
        appVerifier
      );

      setVerificationId(verificationId);
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error.message);
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  const { errors, values, touched, isSubmitting, getFieldProps, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit
    });

  const confirmOtp = useCallback(
    async (otp: string, verificationId: string) => {
      const phoneCredential = PhoneAuthProvider.credential(verificationId, otp);
      const { user: newUser } = await signInWithCredential(
        auth,
        phoneCredential
      );

      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          uid: newUser.uid,
          referrer: referrer,
          ...values
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        throw new AuthError(data.code, data.message);
      }
    },
    [referrer, values]
  );

  useEffect(() => {
    if (otp && verificationId) {
      confirmOtp(otp, verificationId);
    }
  }, [otp, verificationId, confirmOtp]);

  return (
    <FormWrapper>
      {error && <p className="text-danger">{error}</p>}
      <form noValidate onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="name">Full Name *</label>
            <Input
              type="text"
              id="name"
              {...getFieldProps("name")}
              required
              placeholder="Full Name"
            />
            {Boolean(touched.name && errors.name) && (
              <small className="text-red-500">{errors.name}</small>
            )}
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <Input
              {...getFieldProps("phone")}
              type="tel"
              required
              placeholder="Ex. 0240000000"
              autoComplete="off"
              id="phone"
            />
            {Boolean(touched.phone && errors.phone) && (
              <small className="text-red-500">{errors.phone}</small>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              {...getFieldProps("password")}
              required
              type="password"
              autoComplete="new-password"
            />
            {Boolean(touched.password && errors.password) && (
              <small className="text-red-500">{errors.password}</small>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <button
            id="submit-button"
            className="bg-primary text-white rounded hover:bg-primary2 px-2 py-2"
            type="submit"
            disabled={isSubmitting}
          >
            Register {isSubmitting && <Spinner animation="grow" />}
          </button>
        </div>
      </form>
    </FormWrapper>
  );
};

export default Register;

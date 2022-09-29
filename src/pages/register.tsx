import * as Yup from "yup";
import { FormikConfig, useFormik } from "formik";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import "yup-phone-lite";
import FormWrapper from "@/components/Layout/FormWrapper";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRecaptcha } from "@/hooks/recaptcha";
import { AuthError } from "@/helpers/constructors";
import { useAuth } from "@/components/Context/Auth";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { formatPhone } from "@/helpers/utils";
import { referrerdb } from "./_app";

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
  const { replace } = useRouter();
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

      replace("/");
    },
    [referrer, values, replace]
  );

  useEffect(() => {
    if (otp && verificationId) {
      confirmOtp(otp, verificationId);
    }
  }, [otp, verificationId, confirmOtp]);

  return (
    <FormWrapper>
      {error && <p className="text-danger">{error}</p>}
      <Form noValidate onSubmit={handleSubmit}>
        <Row>
          <Col xs={12}>
            <Form.Group>
              <Form.Label htmlFor="name">Full Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                {...getFieldProps("name")}
                required
                placeholder="First Name"
                isInvalid={Boolean(touched.name && errors.name)}
              />
              <Form.Control.Feedback
                type={touched.name && errors.name ? "invalid" : "valid"}
              >
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Form.Group>
              <Form.Label htmlFor="phone">Phone</Form.Label>
              <Form.Control
                {...getFieldProps("phone")}
                type="tel"
                required
                placeholder="Ex. 0240000000"
                autoComplete="off"
                id="phone"
                isInvalid={Boolean(touched.phone && errors.phone)}
              />
              <Form.Control.Feedback
                type={touched.phone && errors.phone ? "invalid" : "valid"}
              >
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                {...getFieldProps("password")}
                required
                type="password"
                autoComplete="new-password"
                isInvalid={Boolean(touched.password && errors.password)}
              />
              <Form.Control.Feedback
                type={touched.password && errors.password ? "invalid" : "valid"}
              >
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-center">
          <Button
            id="submit-button"
            type="submit"
            size="lg"
            variant="dark"
            disabled={isSubmitting}
          >
            Register {isSubmitting && <Spinner animation="grow" />}
          </Button>
        </div>
      </Form>
    </FormWrapper>
  );
};

export default Register;

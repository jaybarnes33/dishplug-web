import * as Yup from "yup";
import { FormikConfig, useFormik } from "formik";
import { Button, Col, Form, Row } from "react-bootstrap";
import "yup-phone-lite";
import FormWrapper from "@/components/Layout/FormWrapper";
import { linkWithCredential, PhoneAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRecaptcha } from "@/hooks/recaptcha";
import { AuthError } from "@/helpers/constructors";
import { useAuth } from "@/components/Context/Auth";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(2).required().label("First name"),
  lastName: Yup.string().min(2).required().label("Last name"),
  email: Yup.string().email().required().label("Email"),
  phone: Yup.string()
    .phone("GH", "Please enter a valid phone number")
    .required()
    .label("Phone Number"),
  password: Yup.string()
    .min(8)
    .required("Password field can't be empty")
    .label("Password"),
});

const Register = () => {
  const { user } = useAuth();
  const { appVerifier, recaptchaResponse } = useRecaptcha();
  const [verificationId, setVerificationId] = useState("");
  const [otp, setOtp] = useState("");
  const { replace } = useRouter();
  const [error, setError] = useState("");
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
        values.phone.replace("0", "+233"),
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
      onSubmit,
    });

  const confirmOtp = useCallback(
    async (otp: string, verificationId: string) => {
      if (!user) {
        throw new Error(
          "Something went wrong, Please refresh the page and try again"
        );
      }

      const phoneCredential = PhoneAuthProvider.credential(verificationId, otp);
      const { user: newUser } = await linkWithCredential(user, phoneCredential);

      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: newUser.uid,
          ...values,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        throw new AuthError(data.code, data.message);
      }

      replace("/");
    },
    [user, values, replace]
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
          <Col md={6}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                {...getFieldProps("firstName")}
                required
                placeholder="First Name"
                isInvalid={Boolean(touched.firstName && errors.firstName)}
              />
              <Form.Control.Feedback
                type={
                  touched.firstName && errors.firstName ? "invalid" : "valid"
                }
              >
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                {...getFieldProps("lastName")}
                required
                placeholder="Last Name"
                isInvalid={Boolean(touched.lastName && errors.lastName)}
              />
              <Form.Control.Feedback
                type={touched.lastName && errors.lastName ? "invalid" : "valid"}
              >
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                {...getFieldProps("email")}
                required
                type="email"
                placeholder="Email"
                isInvalid={Boolean(touched.email && errors.email)}
              />
              <Form.Control.Feedback
                type={touched.email && errors.email ? "invalid" : "valid"}
              >
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                {...getFieldProps("phone")}
                type="tel"
                required
                placeholder="Ex. 0240000000"
                autoComplete="off"
                isInvalid={Boolean(touched.phone && errors.phone)}
              />
              <Form.Control.Feedback
                type={touched.phone && errors.phone ? "invalid" : "valid"}
              >
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
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
            Register
          </Button>
        </div>
      </Form>
    </FormWrapper>
  );
};

export default Register;

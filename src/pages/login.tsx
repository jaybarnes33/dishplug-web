import * as Yup from "yup";
import { FormikConfig, useFormik } from "formik";
import { Button, Form, Toast } from "react-bootstrap";
import FormWrapper from "@/components/Layout/FormWrapper";
import { emailRegex, phoneRegex } from "@/helpers/constants";
import { AuthError } from "@/helpers/constructors";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRouter } from "next/router";
import { useState } from "react";
const initialValues = {
  identity: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  identity: Yup.string()
    .required("Please enter your Email or Phone Number")
    .test("test-name", "Enter Valid Email or Phone Number", function (value) {
      if (!value) return false;

      const isValidEmail = emailRegex.test(value);
      const isValidPhone = phoneRegex.test(value);

      if (!isValidEmail && !isValidPhone) {
        return false;
      }

      return true;
    })
    .label("Email or Password"),
  password: Yup.string()
    .min(8)
    .required("Password field can't be empty")
    .label("Password"),
});

const Login = () => {
  const { replace } = useRouter();
  const [error, setError] = useState("");
  const onSubmit: FormikConfig<typeof initialValues>["onSubmit"] = async (
    values,
    actions
  ) => {
    try {
      const email = emailRegex.test(values.identity) ? values.identity : "";
      const phone = phoneRegex.test(values.identity) ? values.identity : "";

      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phone,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new AuthError(data.code, data.message);
      }

      await signInWithCustomToken(auth, data.token);
      replace("/");
    } catch (error) {
      if (error instanceof AuthError) {
        console.log(error.message);
        setError(error.message);
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  const { errors, touched, isSubmitting, getFieldProps, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <FormWrapper>
      {error && <p className="text-danger">{error}</p>}
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label>Email or Phone</Form.Label>
          <Form.Control
            {...getFieldProps("identity")}
            isInvalid={Boolean(touched.identity && errors.identity)}
            placeholder="Ex. 0240000000"
            required
          />
          <Form.Control.Feedback
            type={touched.identity && errors.identity ? "invalid" : "valid"}
          >
            {errors.identity}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...getFieldProps("password")}
            type="password"
            isInvalid={Boolean(touched.password && errors.password)}
            placeholder="Secured Password"
            required
          />
          <Form.Control.Feedback
            type={touched.password && errors.password ? "invalid" : "valid"}
          >
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button
            type="submit"
            variant="dark"
            size="lg"
            disabled={isSubmitting}
          >
            Login
          </Button>
        </div>
      </Form>
    </FormWrapper>
  );
};

export default Login;

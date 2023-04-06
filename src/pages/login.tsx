import * as Yup from "yup";
import { FormikConfig, useFormik } from "formik";

import FormWrapper from "@/components/Layout/FormWrapper";
import { emailRegex, phoneRegex } from "@/helpers/constants";
import { AuthError } from "@/helpers/constructors";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithCustomToken
} from "firebase/auth";
import { auth } from "@/lib/firebase/client";

import { useState } from "react";
import Input from "@/components/Core/Input";
const initialValues = {
  identity: "",
  password: ""
};

const validationSchema = Yup.object().shape({
  identity: Yup.string()
    .required("Please enter your Phone Number")
    .test("test-name", "Enter Valid Phone Number", function (value) {
      if (!value) return false;

      const isValidPhone = phoneRegex.test(value);

      if (!isValidPhone) {
        return false;
      }

      return true;
    })
    .label("Phone or Password"),
  password: Yup.string()
    .min(8)
    .required("Password field can't be empty")
    .label("Password")
});

const Login = () => {
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          phone,
          password: values.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new AuthError(data.code, data.message);
      }

      await setPersistence(auth, browserLocalPersistence);
      await signInWithCustomToken(auth, data.token);
    } catch (error) {
      if (error instanceof AuthError) {
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
      onSubmit
    });

  return (
    <FormWrapper>
      {error && <p className="text-danger">{error}</p>}
      <form noValidate onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Phone</label>
          <Input
            {...getFieldProps("identity")}
            placeholder="Ex. 0240000000"
            required
          />
          {Boolean(touched.identity && errors.identity) && (
            <div
            // type={touched.identity && errors.identity ? "invalid" : "valid"}
            >
              {errors.identity}
            </div>
          )}
        </div>
        <div>
          <label>Password</label>
          <Input
            {...getFieldProps("password")}
            type="password"
            placeholder="Secured Password"
            required
          />
          {Boolean(touched.password && errors.password) && (
            <div
            // type={touched.password && errors.password ? "invalid" : "valid"}
            >
              {errors.password}
            </div>
          )}
        </div>
        <div className="flex justify-center mt-3">
          <button
            className="bg-primary text-neutral-100 p-2 px-3 rounded font-semibold hover:bg-primary2"
            type="submit"
            disabled={isSubmitting}
          >
            Login
            {isSubmitting && "loading"}
          </button>
        </div>
      </form>
    </FormWrapper>
  );
};

export default Login;

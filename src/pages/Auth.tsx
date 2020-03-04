import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

const authSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
});

interface AuthFormValues {
  email: string;
  password: string;
}

export class AuthPage extends Component {
  initialValues: AuthFormValues = { email: "", password: "" };
  handleSubmit = (
    values: { email: string; password: string },
    { setSubmitting }: FormikHelpers<AuthFormValues>
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Formik
          initialValues={{
            email: this.initialValues.email,
            password: this.initialValues.password
          }}
          validationSchema={authSchema}
          onSubmit={this.handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <label>
                Email: <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </label>
              <label>
                Password:
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </label>
              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

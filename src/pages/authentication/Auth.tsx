import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import styles from "./Auth.module.scss";

const authSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

type AuthFormValues = {
  email: string;
  password: string;
};

export class AuthPage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  initialValues: AuthFormValues = { email: "", password: "" };
  handleSubmit = (
    values: { email: string; password: string },
    { setSubmitting }: FormikHelpers<AuthFormValues>,
  ) => {
    this.props.history.push("seedlings");
  };

  render() {
    return (
      <div className={styles.Auth}>
        <div className={styles.AuthDialog}>
          <div className={styles.AuthDialog_header}>
            <p className={styles.AuthDialog_header_text}>
              However bad life may seem, there is always something you can do
              and succed at. While there's life, there's hope.
            </p>
            <strong className={styles.AuthDialog_header_textAuthor}>
              Stephen Hawking
            </strong>
          </div>
          <Formik
            initialValues={{
              email: this.initialValues.email,
              password: this.initialValues.password,
            }}
            validationSchema={authSchema}
            onSubmit={this.handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={styles.AuthDialog_form}>
                <Field
                  className={styles.AuthDialog_form_field}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  className={styles.AuthDialog_form_error}
                  name="email"
                  component="div"
                />
                <Field
                  className={styles.AuthDialog_form_field}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  className={styles.AuthDialog_form_error}
                  name="password"
                  component="div"
                />
                <div className={styles.AuthDialog_formActions}>
                  <button
                    className={styles.AuthDialog_formActions_button}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

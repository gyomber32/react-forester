import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import styles from "./AuthForm.module.scss";

type Props = {
  login: (email: string, password: string) => void;
};

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

const initialValues: AuthFormValues = { email: "", password: "" };

const AuthForm: React.FC<Props> = (props) => {
  return (
    <div className={styles.AuthForm}>
      <div className={styles.AuthForm_header}>
        <p className={styles.AuthForm_header_text}>
          However bad life may seem, there is always something you can do and
          succed at. While there's life, there's hope.
        </p>
        <strong className={styles.AuthForm_header_textAuthor}>
          Stephen Hawking
        </strong>
      </div>
      <Formik
        initialValues={{
          email: initialValues.email,
          password: initialValues.password,
        }}
        validationSchema={authSchema}
        onSubmit={(values: AuthFormValues) => {
          props.login(values.email, values.password);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.AuthForm_form}>
            <Field
              className={styles.AuthForm_form_field}
              type="email"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage
              className={styles.AuthForm_form_error}
              name="email"
              component="div"
            />
            <Field
              className={styles.AuthForm_form_field}
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage
              className={styles.AuthForm_form_error}
              name="password"
              component="div"
            />
            <div className={styles.AuthForm_formActions}>
              <button
                className={styles.AuthForm_formActions_button}
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
  );
};

export default AuthForm;

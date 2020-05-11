import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import { History } from "history";

import axios from "axios";

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

type Props = {
  history: History;
};

const AuthPage: React.FC<Props> = (props) => {
  const initialValues: AuthFormValues = { email: "", password: "" };
  const handleSubmit = (
    values: { email: string; password: string },
    { setSubmitting }: FormikHelpers<AuthFormValues>
  ) => {
    const query = {
      query: `
        query {
          login(userInput: {email: "${values.email}", password: "${values.password}"}) {
            _id
            token
            tokenExpiration
          }
        }`,
    };
    axios({
      url: "http://localhost:3000/graphql",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: JSON.stringify(query),
    })
      .then((authData) => {
        localStorage.setItem('token', authData.data.data.login.token);
        console.log(authData.data.data.login.token)
        /* NEXT STEP IS AUTOLOGIN AND AUTO LOGOUT
        sessionStorage.setItem('tokenExpiry', authData.data.login.tokenExpiration);
        */
        props.history.push("seedlings");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.Auth}>
      <div className={styles.AuthDialog}>
        <div className={styles.AuthDialog_header}>
          <p className={styles.AuthDialog_header_text}>
            However bad life may seem, there is always something you can do and
            succed at. While there's life, there's hope.
          </p>
          <strong className={styles.AuthDialog_header_textAuthor}>
            Stephen Hawking
          </strong>
        </div>
        <Formik
          initialValues={{
            email: initialValues.email,
            password: initialValues.password,
          }}
          validationSchema={authSchema}
          onSubmit={handleSubmit}
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
};

export default AuthPage;

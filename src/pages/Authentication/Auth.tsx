import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import Popup from "../../components/Popup/Popup";

import { History } from "history";
import axios from "axios";

import PopUp from "../../models/types/PopUp";

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
  const [popup, setPopup] = useState<PopUp>({ isOpen: false, message: "" });

  const initialValues: AuthFormValues = { email: "", password: "" };
  const handleSubmit = (
    values: { email: string; password: string },
    { setSubmitting }: FormikHelpers<AuthFormValues>
  ) => {
    const query = {
      query: `
        query {
          login(userInput: {email: "${values.email}", password: "${values.password}"}) {
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
        if (authData.data.hasOwnProperty("errors")) {
          setPopup({ isOpen: true, message: authData.data.errors[0].message });
          setTimeout(() => {
            setPopup({ isOpen: false, message: "" });
          }, 5500);
          return;
        } else {
          localStorage.setItem("token", authData.data.data.login.token);
          localStorage.setItem(
            "tokenExpiration",
            authData.data.data.login.tokenExpiration
          );
          props.history.push("trees");
        }
      })
      .catch((error) => {
        console.log(error);
        setPopup({ isOpen: true, message: error.message });
        setTimeout(() => {
          setPopup({ isOpen: false, message: "" });
        }, 5500);
        return;
      });
  };

  return (
    <div className={styles.Auth}>
      {popup.isOpen && <Popup message={popup.message}></Popup>}
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

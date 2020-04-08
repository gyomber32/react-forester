/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import styles from "./Auth.module.scss";
//const axios = require("axios")

/*const httpRequest = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json" }
});*/

const authSchema = Yup.object().shape({
  password: Yup.string()
    // .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

interface AuthFormValues {
  email: string;
  password: string;
}

export class AuthPage extends Component<any, any> {
  initialValues: AuthFormValues = { email: "", password: "" };
  handleSubmit = (
    values: { email: string; password: string },
    { setSubmitting }: FormikHelpers<AuthFormValues>,
    requestBody = {
      query: `
        query {
          login(email: "${values.email}", password: "${values.password}") {
            userId
            token
            tokenExpiration
          }
        }
      `,
    }
  ) => {
    this.props.history.push("seedlings");
    /*fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res);
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
      });*/
    /*httpRequest
      .post("http://localhost:8000/graphql", requestBody)
      .then(response => {
        console.log(response);
        setSubmitting(false);
      })
      .catch(error => {
        console.log(error);
        setSubmitting(false);
      });*/
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

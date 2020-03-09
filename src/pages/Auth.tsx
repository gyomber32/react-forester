import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
const axios = require("axios")

const httpRequest = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json" }
});

const authSchema = Yup.object().shape({
  password: Yup.string()
    // .min(8, "Too Short!")
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
      `
    }
  ) => {
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
    httpRequest
      .post("http://localhost:8000/graphql", requestBody)
      .then(response => {
        console.log(response);
        setSubmitting(false);
      })
      .catch(error => {
        console.log(error);
        setSubmitting(false);
      });
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

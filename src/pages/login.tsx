import * as React from "react";
import { Field, Form, Formik } from "formik";
import authService from "service/auth/authService";
import Router from "next/router";

export default class LoginPage extends React.Component {
  async componentDidMount() {
    if (authService.authorized) {
      await Router.push("/offer-request");
    }
  }

  render() {
    return (
      <>
        <h1>Login</h1>
        <Formik onSubmit={authService.login} initialValues={{ username: "", password: "" }}>
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="username" />
              <Field type="password" name="password" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

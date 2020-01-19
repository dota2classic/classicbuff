import * as React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import authService from "service/auth/authService";
import Router from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

export default class LoginPage extends React.Component<WithRouterProps> {
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
              <ErrorMessage name="username" component="div" />

              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />

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

if (typeof window !== "undefined") {
  (window as any).router = Router;
}

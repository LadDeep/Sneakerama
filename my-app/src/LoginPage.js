import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './LoginPage.css'

const LoginPage = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = () => {
    console.log('Login button clicked!');
    alert('Login Successful!');
  };

  const registerButton = () => {
    console.log('Register button clicked');
    window.location.href = '/';
  };

  const forgotPassword = () => {
    console.log('Forgot button clicked');
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" className="login-button">
            Login
          </button>
          <div className='signup-form-row'>
          <button type="button" className="signup-button" onClick={registerButton}>
            Sign Up
          </button>
          <button type="button" className="signup-button" onClick={forgotPassword}>
            Forgot Password?
          </button>
          </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;

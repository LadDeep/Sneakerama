import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import '../../css/Login.css'
import Header from '../Components/Header';
import Footer from '../Components/Footer';


const LoginPage = () => {
const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').matches(/^[a-zA-Z0-9._-]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 'Invalid email address'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = () => {
    console.log('Login button clicked!');
    alert('Login Successful!');
  };

  const registerButton = () => {
    console.log('Register button clicked');
    navigate('/signup');
  };

  const forgotPassword = () => {
    console.log('Forgot button clicked');
    navigate('/forgotpassword');
  };
  return (
    <div>        
        <Header/>
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
            <button type="submit" className="signup-button">
            Login
          </button>
          <div className='signup-form-row'>
          <button type="button" className="login-button" onClick={registerButton}>
            Sign Up
          </button>
          <button type="button" className="login-button" onClick={forgotPassword}>
            Forgot Password?
          </button>
          </div>
          </Form>
        </Formik>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default LoginPage;

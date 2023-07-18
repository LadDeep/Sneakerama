import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import '../../css/Login.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [emailValid, setEmailValid] = useState(false);

  const initialValues = {
    email: '',
    answer:'',
    password:'',
    confirmPassword:'',
  };
  let question = 'What is the name of your first pet?';
  const [correctAnswer, setCorrectAnswer] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').matches(/^[a-zA-Z0-9._-]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 'Invalid email address'),
    answer: Yup.string().required('Answer is required'),
    password: Yup.string().required('Password is required').test(
        'password-check',
        'Password must contain at least one uppercase letter',
        (value) => {
          return /^(?=.*[A-Z])/.test(value);
        }
      ).test(
        'password-check',
        'Password must contain at least one lowercase letter',
        (value) => {
          return /^(?=.*[a-z])/.test(value);
        }
      ).test(
        'password-check',
        'Password must contain at least one number',
        (value) => {
          return /^(?=.*\d)/.test(value);
        }
      ).test(
        'password-check',
        'Password must contain at least one special character',
        (value) => {
          return /^(?=.*[@$!%*?&])/.test(value);
        }
      ).test(
        'password-check',
        'Password must be at least 8 characters long',
        (value) => {
          return value.length >= 8;
        }
      ),  
      confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
      });

  const loginRedirect = () => {
    navigate('/login');
  };

  const isEmailValid = (value) => {
    console.log(value);
    if (value === '' || value === undefined || value === null ||validationSchema.fields.email.isValidSync(value) === false) {
        return;
    }
    else{
    setEmailValid(true);
    console.log("valid")
    }
  };

  const verifyAnswer = (event) => {
    if(event)
        console.log(event.answer);
        //add event.answer to if statement and check if it matches the answer in the database
        if(event.answer === '' || event.answer === undefined || event.answer === null){ 
            return;
        }
        else
            setCorrectAnswer(true);
  };

  const changePassword = (event) => {
    console.log("hello")
    console.log(validationSchema.fields.password.tests)

    if(event.password === '' || event.password === undefined || event.password === null || validationSchema.fields.password.isValidSync(event.password) === false
    || event.password !== event.confirmPassword){
            alert("Password is not valid");
   return;
    }
    else{

        alert("Password Changed Successfully");
        navigate('/login');
    }
    };

    const handleRevealQuestion = (values) => {
        isEmailValid(values.email);
      };

  return (
    <div>
      <Header />
      <div className="login-page">
        <div className="login-container">
          <h1>Forgot Password</h1>
          <Formik initialValues={initialValues} validationSchema={validationSchema}>
          {({ values }) => ( // Destructure values from Formik props
              <Form>
            {!emailValid && validationSchema && (
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field type="email" id="email" name="email" />
                    <ErrorMessage name="email" component="div" className="error-message" />
                    <button
                      type="button" 
                      className="signup-button"
                      onClick={() => handleRevealQuestion(values)}
                    >
                      Reveal Question
                    </button>
                  </div>
                )
                }
             {emailValid && validationSchema && !correctAnswer &&  <div className="form-group">
                  <label>Question:</label>
                  <label htmlFor="question">{question}</label>
                  <label htmlFor="answer">Answer</label>
                  <Field type="text" id="answer" name="answer" />
                  <ErrorMessage name="answer" component="div" className="error-message" />
                  <button type="submit" className="signup-button" onClick={() => verifyAnswer(values)}>
                    Submit
                  </button>
                </div>
             }    
                {correctAnswer && 
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <Field type="password" id="password" name="password" />
                    <ErrorMessage name="password" component="div" className="error-message" />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field type="password" id="confirmPassword" name="confirmPassword" />
                    <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                <button type="submit" className="signup-button" onClick={()=>changePassword(values)}>
                    Change Password
                </button>
                </div>
              }

                <div className="signup-form-row">
                <button type="button" className="login-button" onClick={loginRedirect}>
                  Go to Login
                </button>
              </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
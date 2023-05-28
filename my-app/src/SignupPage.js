import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './SignupPage.css';

const SignupPage = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAndConditions: false,
    userQuestion: '',
    userAnswer: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    addressLine1: Yup.string().required('Address Line 1 is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State/Province is required'),
    country: Yup.string().required('Country is required'),
    phoneNumber: Yup.string().required('Phone Number is required').length(10, 'Phone Number is not valid'),
    userQuestion: Yup.string().required('Security Question is required'),
    userAnswer: Yup.string().required('Security Answer is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password is too short - should be at least 8 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    termsAndConditions: Yup.boolean().oneOf([true], 'You must accept the Terms and Conditions'),
  });

  const handleSubmit = () => {
    console.log('Signup button clicked!');
    if(validationSchema.isValid){
      alert('Registration Successful!');
      window.location.href = '/login';
    }
  };

  const loginButton = () => {
    window.location.href = '/login';
  };

  return (
    <div className="signup-page">
      <div className="signup-parent_sect">
        <h1>Sign Up</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <Form>
              <div className="signup-form-row">
                <FieldGroup name="firstName" label="First Name" />
                <FieldGroup name="lastName" label="Last Name" />
              </div>
              <div className="signup-form-row">
              <FieldGroup name="dateOfBirth" label="Date of Birth" type="date" />
                <FieldGroup name="gender" label="Gender" as="select" className="gender">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="female">Other</option>
                  <option value="female">Prefer not to say</option>
                </FieldGroup>
              </div>
                <div className="signup-form-row">
                <FieldGroup name="addressLine1" label="Address Line 1" />
                <FieldGroup name="addressLine2" label="Address Line 2" />
              </div>
              <div className="signup-form-row">
                <FieldGroup name="city" label="City" />
                <FieldGroup name="state" label="State/Province" />
              </div>
              <div className="signup-form-row">
              <FieldGroup name="country" label="Country" />
                <FieldGroup name="phoneNumber" label="Phone Number" />
              </div>
              <div className="signup-form-row">
                <FieldGroup name="userQuestion" label="Question" />
                <FieldGroup name="userAnswer" label="Answer" />
              </div>
              <span> </span>
              <div className="signup-form-row">
              <FieldGroup name="email" label="Email" type="email" />
              </div>
              <div className="signup-form-row">
              <FieldGroup name="password" label="Password" type="password" />
              <FieldGroup name="confirmPassword" label="Confirm Password" type="password" />
              </div>
              <div className="signup-form-row">
                <div className="signup-form-group">
                  <label>
                    <Field type="checkbox" name="termsAndConditions" />
                    Terms and Conditions
                  </label>
                  {errors.termsAndConditions && touched.termsAndConditions && (
                    <div className="signup-error-message">{errors.termsAndConditions}</div>
                  )}
                </div>
              </div>
              <button type="submit" className='signup-button' onSubmit={handleSubmit}>Sign Up</button>
              <button type="button" className='login-button' onClick={loginButton}>
            Have an account? Log in!
          </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const FieldGroup = ({ name, label, ...rest }) => (
  <div className="signup-form-group">
    <label htmlFor={name}>{label}</label>
    <Field id={name} name={name} {...rest} />
    <ErrorMessage name={name} component="div" className="signup-error-message" />
  </div>
);

export default SignupPage;

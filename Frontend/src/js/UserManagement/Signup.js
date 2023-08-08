import React, { useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../css/Signup.css'
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header'
import  {authService}  from '../../services/authService';
import {  ToastContainer } from 'react-toastify';

const SignupPage = () => {
    const navigate = useNavigate();
    const dateOfBirthInputRef = useRef(null);

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
    Seller: false,
    isVerifiedSeller: false,
    isAdmin: false,
    wishlist: [],
    cart: [],
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
    email: Yup.string().required('Email is required').matches(/^[a-zA-Z0-9._-]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 'Invalid email address'),
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
      .required('Confirm Password is required'),
    termsAndConditions: Yup.boolean().oneOf([true], 'You must accept the Terms and Conditions'),
  });
  
  const handleSubmit = async (values) => {
    console.log(values);
    try {
        const response = await authService.createUser(values);
        console.log(response);
        if (response.status === 200) {
            alert('Registration Successful!');
            navigate('/login');
        } else if (response.status === 409) {
            alert('Email already exists!');
        } else {
            alert('Registration Failed!');
        }
    } catch (error) {
        console.log(error);
    }
}


  const loginButton = () => {
    navigate('/login');
  };


  useEffect(() => {
    const dateOfBirthInput = dateOfBirthInputRef.current;

    const today = new Date().toISOString().split('T')[0];
    dateOfBirthInput.setAttribute('max', today);

    dateOfBirthInput.addEventListener('input', function() {
      const selectedDate = new Date(this.value);
      const currentDate = new Date();

      if (selectedDate > currentDate) {
        this.setCustomValidity("Date of birth should be in the past");
      } else {
        this.setCustomValidity("");
      }
    });
  }, []);


  return (
    <div>
        <Header/>
    <div className="signup-page">
      <div className="signup-parent_sect">
        <h1 className='login-h1'>Sign Up</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <Form>
              <div className="signup-form-row">
                <FieldGroup name="firstName" label="First Name" />
                <FieldGroup name="lastName" label="Last Name" />
              </div>
              <div className="signup-form-row">
              <FieldGroup 
              name="dateOfBirth" 
              label="Date of Birth" 
              type="date"  
              innerRef={dateOfBirthInputRef}
                />
                <FieldGroup name="gender" label="Gender" as="select" >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="female">Other</option>
                  <option value="female">Prefer not to say</option>
                </FieldGroup>
              </div>
                <div className="signup-form-row">
                <FieldGroup name="addressLine1" label="Address Line 1"/>
                <FieldGroup name="addressLine2" label="Address Line 2"/>
              </div>
              <div className="signup-form-row">
                <FieldGroup name="city" label="City"/>
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
              <div className='white-line'> </div>
              <div className="signup-form-row">
              <FieldGroup name="email" label="Email" type="email" style={{ width: '170px' }} />
              </div>
              <div className="signup-form-row">
              <FieldGroup name="password" label="Password" type="password"/>
              <FieldGroup name="confirmPassword" label="Confirm Password" type="password" />
              </div>
              <div className="signup-form-row">
                <div>
                  <label>
                    <Field type="checkbox" name="termsAndConditions" />
                    Terms and Conditions
                  </label>
                  {errors.termsAndConditions && touched.termsAndConditions && (
                    <div className="signup-error-message">{errors.termsAndConditions}</div>
                  )}
                </div>
                <label>
                    <Field type="checkbox" name="Seller" />
                    Register as Seller
                  </label>
              </div>
              <button type="submit" className='signup-button'>Sign Up</button>
              <button type="button" className='login-button' onClick={loginButton}>
            Have an account? Log in!
          </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    <ToastContainer position='top-right' autoClose={3000} />
    <Footer/>
    </div>
  );
};

const FieldGroup = ({ name, label, ...rest }) => (
  <div style={{textAlign:'center'}}>
 <div className="signup-form-group">
    <label htmlFor={name} className="signup-form-group label">{label}</label>
    <Field id={name} name={name} {...rest} />
    </div>
  <ErrorMessage name={name} component="div" className="signup-error-message" />
  </div>
);

export default SignupPage;

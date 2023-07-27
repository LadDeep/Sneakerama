import React, { useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../css/Signup.css'
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { authService } from '../../services/authService';
import { Modal } from 'antd';
const EditProfile = () => {
  const { confirm } = Modal;

    const navigate = useNavigate();
    const dateOfBirthInputRef = useRef(null);

  const initialValues = {
    firstName: '',
    lastName:  '',
    dateOfBirth: '',
    gender: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    phoneNumber: '',
    email: '',
    userQuestion: '',
    userAnswer: '',
    Seller: '',
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().length(10, 'Phone Number is not valid'),
    email: Yup.string().matches(/^[a-zA-Z0-9._-]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 'Invalid email address'),
    dateOfBirth: Yup.date(),
  });

  const handleSubmit = async(values) => {
    console.log(values);
    const user =await authService.getCurrentUser();
    const email=user.data.email;
    console.log(email);
    console.log(values);
    let updatedValues={};
    for(let key in values){
      if(values[key]!=='' && values[key]!==null && values[key]!==undefined){
        updatedValues[key]=values[key];
      }
      else{
        //delete the pair
        delete (updatedValues[key]);
      }
      }
    console.log(updatedValues);
    console.log('Update button clicked!');
    console.log(email);
    if(Object.keys(updatedValues).length===0){
      return;
    }
    else{
    const response = await authService.updateUserDetails(email,updatedValues);
    console.log(response);
    if(validationSchema.isValid){
      if(response.success===true){
        alert('Details Updated!');
       // window.location.reload();
      }
      else
        alert('Details not updated!');
    }
  }
  };

  const goToHomePage = () => {
    navigate('/');
  };


  useEffect(() => {
    const dateOfBirthInput = dateOfBirthInputRef.current;

    const today = new Date();
    const tenYearsAgo = new Date(today);
    tenYearsAgo.setFullYear(today.getFullYear() - 10);
    let MaxDate=tenYearsAgo.toISOString().split('T')[0];
    dateOfBirthInput.setAttribute('max', MaxDate);

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

  const deleteAccount = async () => {
    // Ask for confirmation before deleting using Ant Design's confirm modal
    confirm({
      title: 'Are you sure you want to delete your account?',
      onOk: async () => {
        console.log('Delete account button clicked!');
        const user = await authService.getCurrentUser();
        const email = user.data.email;
        console.log(email);
        const response = await authService.deleteUser(email);
        console.log(response);
        if (response.success === true) {
          alert('Account Deleted!');
          authService.logout();
          navigate('/');
        } else {
          alert('Account not deleted!');
        }
      },
      onCancel: () => {
        // If the user cancels (Cancel), do nothing or show a message, as per your requirement
        console.log('Account deletion canceled.');
      },
    });
  };
  


  return (
    <div>
        <Header/>
    <div className="signup-page">
      <div className="signup-parent_sect">
        <h1 className='login-h1'>Edit Profile</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
                <FieldGroup name="gender" label="Gender" as="select">
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
              <div className='white-line'> </div>
              <div className="signup-form-row">
              <FieldGroup name="email" label="Email" type="email" />
              </div>
                <div>
                <label>
                    <Field type="checkbox" name="Seller" />
                    Register as Seller
                  </label>
              </div>
              <button type="submit" className='signup-button'>Update Details</button>
              <button type="button" className='login-button' onClick={goToHomePage}>
            Cancel
          </button>
          <button type="button" className='login-button' onClick={deleteAccount} style={{textAlign:'right', color:'red', fontWeight:'bolder'}}>
            Delete Account
          </button>
            </Form>
        </Formik>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

const FieldGroup = ({ name, label, ...rest }) => (
  <div className="signup-form-group">
    <label htmlFor={name} className='label'>{label}</label>
    <Field id={name} name={name} {...rest} />
    <ErrorMessage name={name} component="div" className="signup-error-message" />
  </div>
);

export default EditProfile;

import React, { useState } from 'react';
import { registerForEvent } from '../../../services/events'; 
import classes from '../../../css/EventRegistration.module.css';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { useLocation } from 'react-router-dom';
import {backImg} from '../../../constants';

const EventRegistration = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({ name: '', age: '', phone: '', email: '' });
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const location = useLocation();
  const eventId = location.state.eventId;
  const eventName = location.state.eventName;
  const img = backImg;

  const handleNameChange = (e) => {
    setName(e.target.value);
    const nameParts = e.target.value.split(' ').filter(Boolean);
    if (nameParts.length < 2) {
      setErrors(prev => ({ ...prev, name: 'Please give your full name.' }));
    } else {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
    if (parseInt(e.target.value) <= 16) {
      setErrors(prev => ({ ...prev, age: 'Age should be above 16.' }));
    } else {
      setErrors(prev => ({ ...prev, age: '' }));
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (e.target.value.length !== 10 || isNaN(e.target.value)) {
      setErrors(prev => ({ ...prev, phone: 'Phone number should have only 10 digits.' }));
    } else {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
    if (!emailRegex.test(e.target.value)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email format.' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errors.name && !errors.age && !errors.phone && !errors.email) {
      const eventDetails = {
        eventId,
        eventName,
        name,
        age,
        phone,
        email
      };

      const result = await registerForEvent(eventDetails);
      setSubmitStatus({ success: result.success, message: result.message });
      if (result.success) {
        setName('');
        setAge('');
        setPhone('');
        setEmail('');
      }
      setShowPopup(true);
    }
  };

  return (
    <>
      <Header />
      <div className={classes.eventregistration} style={{backgroundImage: `url(${img}), linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))`}}>
        <h1 className={classes.pagetitle}>Registration Form</h1>
        <form className={classes.registrationform} onSubmit={handleSubmit}>
          <div className={classes.formgroup}>
            <label className={classes.evelabel} htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} required />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          </div>
          <div className={classes.formgroup}>
            <label className={classes.evelabel} htmlFor="age">Age</label>
            <input type="number" id="age" value={age} onChange={handleAgeChange} required />
            {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
          </div>
          <div className={classes.formgroup}>
            <label className={classes.evelabel} htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" value={phone} onChange={handlePhoneChange} required />
            {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
          </div>
          <div className={classes.formgroup}>
            <label className={classes.evelabel} htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={handleEmailChange} required />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          </div>
          <button type="submit" className={classes.submitbutton}>Register</button>
        </form>
        {showPopup && (
          <div className={classes.popup}>
            <div className={classes.popupcontent}>
              <h2>{submitStatus.success ? 'Registration Successful!' : 'Registration Failed!'}</h2>
              <p>{submitStatus.message}</p>
              <button className={classes.closebutton} onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EventRegistration;

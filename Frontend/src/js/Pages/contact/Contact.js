import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import React, { useState } from 'react';
import classes from '../../../css/Contact.module.css';

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [formExpanded, setFormExpanded] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', { name, email, message });
      setName('');
      setEmail('');
      setMessage('');
      setFormSubmitted(true);
      setFormExpanded(false);
    };
  
    const handleFormCardClick = () => {
      if (!formExpanded) {
        setFormExpanded(true);
      }
    };
  
    const handleFormCardKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleFormCardClick();
      }
    };
  
    const handleContactCardClick = () => {
      if (formExpanded) {
        setFormExpanded(false);
      }
    };
  
    const handleContactCardKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleContactCardClick();
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === 'name') {
        setName(value);
      } else if (name === 'email') {
        setEmail(value);
      } else if (name === 'message') {
        setMessage(value);
      }
    };
  
    const closeDialog = () => {
      setFormSubmitted(false);
    };

    return (
        <>
        <Header />
            <div className={classes.content}>
          <div className={classes.cardcontainer}>
            <div
              className={`${classes.card} ${classes.contactcard} ${formExpanded ? 'hidden' : ''}`}
              onClick={handleContactCardClick}
              onKeyDown={handleContactCardKeyPress}
              tabIndex={0}
            >
              <h2>Contact Information</h2>
              <p>For any inquiries or assistance, please feel free to contact our customer care.</p>
              <p>Customer Care: +1 123-456-7890</p>
            </div>
  
            <div
              className={`${classes.card} ${classes.formcard} ${formExpanded ? 'expanded' : ''}`}
              onClick={handleFormCardClick}
              onKeyDown={handleFormCardKeyPress}
              tabIndex={0}
            >
              <h2>Contact Us</h2>
              {formExpanded && !formSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    required
                  />
  
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
  
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleInputChange}
                    required
                  />
  
                  <button type="submit">Send</button>
                </form>
              ) : (
                <p className={classes.expandtext}>Send Your Message</p>
              )}
            </div>
          </div>
        </div>
  
        {formSubmitted && (
          <div className={classes.dialogoverlay}>
            <div className={classes.dialogbox}>
              <p>Form Submitted!</p>
              <button onClick={closeDialog}>Close</button>
            </div>
          </div>
        )}
        
        <Footer />
        </>
    );
}

export default Contact;

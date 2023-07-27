import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import React from 'react';
import classes from '../../../css/FAQ.module.css';

function FAQ() {

    return (
        <>
        <Header />
        <div className={classes.container}>
        <h1>FAQ</h1>
        <div className={classes.question}>
          <h2>Q: How can I view my order?</h2>
        </div>
        <div className={classes.answer}>
          <p>Viewing your order is quick and simple. Just follow these steps:</p>
          <ol>
            <li>Log in to your Sneakerama account on the website.</li>
            <li>Navigate to the "My Orders" section, which is usually located in your account dashboard or profile.</li>
            <li>You should see a list of your recent orders. Click on the specific order you want to view for more details.</li>
            <li>On the order details page, you can see the order summary, payment information, shipping details, and any tracking information available.</li>
          </ol>
        </div>

        <div className={classes.question}>
          <h2>Q: Where can I see the sneaker catalogue?</h2>
        </div>
        <div className={classes.answer}>
          <p>To explore our sneaker catalogue and discover the latest styles, please use the following steps:</p>
          <ol>
            <li>Visit the Sneakerama website and log in to your account. If you don't have an account, you can create one for free.</li>
            <li>Once logged in, browse to the "Catalogue" section of the website. It may be accessible through the main menu or a dedicated tab.</li>
            <li>You will find a wide range of sneakers available for browsing. Use the filters and search options to narrow down your choices based on brand, size, color, or any other preferences.</li>
            <li>Click on any sneaker to view detailed product information, including images, descriptions, pricing, and available sizes.</li>
          </ol>
        </div>

        <div className={classes.question}>
          <h2>Q: How can I create an event?</h2>
        </div>
        <div className={classes.answer}>
          <p>At Sneakerama, you can easily create events. Follow these steps to create an event:</p>
          <ol>
            <li>Log in to your Sneakerama account on the website.</li>
            <li>Navigate to the "Events" section, usually accessible through the main menu or designated tab.</li>
            <li>Look for the "Create Event" button or link and click on it.</li>
            <li>Fill in all the necessary details about the event, including the event name, date, time, location, and any additional information you would like to provide.</li>
            <li>Once you've filled in the required information, click "Create" or "Save" to publish your event.</li>
          </ol>
        </div>

        <div className={classes.question}>
          <h2>Q: How can I register for an event?</h2>
        </div>
        <div className={classes.answer}>
          <p>Registering for an event at Sneakerama is a breeze. Follow these simple steps:</p>
          <ol>
            <li>Log in to your Sneakerama account on the website.</li>
            <li>Browse to the "Events" section, usually accessible through the main menu or dedicated tab.</li>
            <li>Look for the event you are interested in and click on it to view more details.</li>
            <li>On the event page, you should find a "Register" button. Click on it to start the registration process.</li>
            <li>Fill out the required registration information, which may include your name, contact details, and any other necessary details specified by the event organizer.</li>
            <li>Once you've completed the registration form, submit it, and you should receive a confirmation of your registration.</li>
          </ol>
        </div>
      </div>
    <Footer />
    </>
    );
}

export default FAQ;

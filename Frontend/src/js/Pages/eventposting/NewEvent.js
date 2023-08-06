import React, { useState } from 'react';
import classes from '../../../css/NewEvent.module.css';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { postNewEvent } from '../../../services/events';
import { formImg } from '../../../constants';

const NewEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventImage, setEventImage] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const [eventNameError, setEventNameError] = useState('');
  const [eventImageUrlError, setEventImageUrlError] = useState('');
  const [eventTimeError, setEventTimeError] = useState('');
  const [eventLocationError, setEventLocationError] = useState('');
  const [eventDescriptionError, setEventDescriptionError] = useState('');
  const [eventDateError, setEventDateError] = useState('');

  const img = formImg;


  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      eventName,
      eventImage,
      eventDate,
      eventTime,
      eventLocation,
      eventDescription,
    };
    
    try{
      const result = await postNewEvent(eventData);
      setSubmitStatus({ success: result.success, message: result.message });
      if (result.success) {
        setEventName('');
        setEventImage('');
        setEventDate('');
        setEventTime('');
        setEventLocation('');
        setEventDescription('');
      }
      setShowPopup(true);
    } catch (error) {
      console.error("Error posting event:", error);
    }
  };

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
    if (e.target.value.trim() === "") {
        setEventNameError("Event Name cannot be empty.");
    } else {
        setEventNameError('');
    }
  };

  const handleEventImageUrlChange = (e) => {
    if ((e.target.value.startsWith('http://') || e.target.value.startsWith('https://')) || e.target.value === "") {
        setEventImage(e.target.value);
        setEventImageUrlError('');
    } else {
        setEventImageUrlError("Please enter a valid URL for Event Image (should start with http:// or https://).");
    }
  };

const handleEventDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    setEventDate(e.target.value);
  
    if (selectedDate < currentDate) {
      setEventDateError("Event date cannot be before today's date.");
    } else {
      setEventDateError('');
    }
  };

const handleEventTimeChange = (e) => {
    setEventTime(e.target.value);
    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(e.target.value) && e.target.value !== "") {
        setEventTimeError("Please enter time in 24-hour format.");
        return;
    }
    setEventTimeError('');
};

const handleEventLocationChange = (e) => {
    setEventLocation(e.target.value);
    if (e.target.value.trim() === "") {
        setEventLocationError("Event Location cannot be empty.");
        return;
    }
    setEventLocationError('');
};


const handleEventDescriptionChange = (e) => {
    setEventDescription(e.target.value);
    if (e.target.value.trim() === "") {
        setEventDescriptionError("Event Description cannot be empty.");
        return;
    }
    setEventDescriptionError('');
};

  return (
    <>
      <Header />
      <div className={classes.postevent} style={{backgroundImage: `url(${img}), linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))`}}>
        <form className={classes.eventform} onSubmit={handleSubmit}>

        <div className={classes.formgroup}>
        <h1 className={classes.pagetitle}>Post an Event</h1><br></br>
            <label className={classes.nevelabel} htmlFor="eventName">Event Name</label>
            <p className={classes.error}>{eventNameError}</p>
            <input type="text" id="eventName" value={eventName} onChange={handleEventNameChange} required />
        </div>

        <div className={classes.formgroup}>
            <label className={classes.nevelabel} htmlFor="eventImage">Event Image URL</label>
            <p className={classes.error}>{eventImageUrlError}</p>
            <input type="url" id="eventImage" value={eventImage} onChange={handleEventImageUrlChange} required />
        </div>
    
        <div className={classes.formgroup}>
            <label className={classes.nevelabel} htmlFor="eventDate">Event Date</label>
            <p className={classes.error}>{eventDateError}</p>
            <input type="date" id="eventDate" value={eventDate} onChange={handleEventDateChange} required />
        </div>
        
        <div className={classes.formgroup}>
            <label className={classes.nevelabel} htmlFor="eventTime">Event Time</label>
            <p className={classes.error}>{eventTimeError}</p>
            <input 
                type="text" 
                id="eventTime" 
                value={eventTime} 
                onChange={handleEventTimeChange} 
                placeholder="HH:mm" />
            <span className={classes.inputHint}>Format: HH:mm (24-hour format)</span>
        </div>

        <div className={classes.formgroup}>
            <label className={classes.nevelabel} htmlFor="eventLocation">Event Location</label>
            <p className={classes.error}>{eventLocationError}</p>
            <input type="text" id="eventLocation" value={eventLocation} onChange={handleEventLocationChange} required />
        </div>

        <div className={classes.formgroup}>
            <label className={classes.nevelabel} htmlFor="eventDescription">Event Description</label>
            <p className={classes.error}>{eventDescriptionError}</p>
            <textarea id="eventDescription" value={eventDescription} onChange={handleEventDescriptionChange} required></textarea>
        </div>

    <button type="submit" className={classes.submitbutton}>Post Event</button>
</form>

{showPopup && (
    <div className={classes.popup}>
        <div className={classes.popupcontent}>
            <h2>{submitStatus.success ? 'Event Posted Successfully!' : 'Event Posting Failed!'}</h2>
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

export default NewEvent;

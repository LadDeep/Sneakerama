import React, { useState, useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { getEventById, formatDate, convertTo12Hour } from '../../../services/events'; 
import classes from '../../../css/MainEvent.module.css';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

const MainEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await getEventById(id);
      setEvent(eventData.event);
    }

    fetchEvent();
  }, [id]);

  if (!event) {
    return 'Loading...'; // or any other loading indication
  }

  const handleRegister = () => {
    navigate(`/eventregistration/${id}`, {
      state: { eventId: id, eventName: event.eventName , eventImg: event.eventImage}
    });
  };

  return (
    <>
    <Header />

    <div className={classes.eventpage}>
      <h2 className={classes.eventname}>{event.eventName}</h2>
      <div className={classes.eventinfo}>
        <div className={classes.eventimage}>
          <img src={event.eventImage} alt={event.eventName} />
        </div>
        <div className={classes.eventdetails}>
          <p className={classes.eventdate}><strong>Event Date: </strong>{formatDate(event.eventDate)}</p>
          <p className={classes.eventtime}><strong>Event Time: </strong>{convertTo12Hour(event.eventTime)}</p>
          <p className={classes.eventlocation}><strong>Location: </strong>{event.eventLocation}</p>
          <strong className={classes.eventdescription}>Description: </strong>
          <p className={classes.eventdescription}>{event.eventDescription}</p>
          <button className={classes.registerbutton} onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>

    <Footer />
    </>
  );
};

export default MainEvent;

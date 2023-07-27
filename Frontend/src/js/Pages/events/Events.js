import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../../../services/events';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import classes from '../../../css/Events.module.css';
import {Link} from 'react-router-dom';
import { authService } from '../../../services/authService';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = async () => {
      const result = await isUserLoggedInAndSeller();
      setIsSeller(result);
    };
    checkUserStatus();
  }, []);
  

  useEffect(() => {
    const checkUserStatus = async () => {
      const result = await isUserLoggedInAndSeller();
      setIsSeller(result);
    };
    checkUserStatus();
  }, []);

  const getUserData = async() => {
    const result = await authService.getCurrentUser();
    return result;
  };

  const isUserLoggedInAndSeller = async () => {
    const userData = await getUserData();

    if (userData == null || userData.data == null) {
      return false;
    }

    return userData !== null && userData.data.isSeller;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const eventData = await getEvents();
      setEvents(eventData.events);
    }

    fetchEvents();
  }, []);

  // Get current posts
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log(isUserLoggedInAndSeller());

  return (
    <>
      <Header />
      <div className={classes.eventspage}>
        <div className={classes.eventcards}>
          {currentEvents.map((event) => (
            <div key={event._id} className={classes.eventcard}>
              <h2 className={classes.eventname}>{event.eventName}</h2>
              <img src={event.eventImage} alt={event.eventName} className={classes.eventimage} />
              <Link
                to={`/event/${event._id}`} 
                state={{eventName : event.eventName, eventImage: event.eventImage }}
                className={classes.registerbutton}
              >
                View
              </Link>
            </div>
          ))}
        </div>
        {isSeller && (
          <div className={classes.postEventContainer}>
            <button
              className={classes.postEventButton}
              onClick={() => navigate('/postevent')}
            >
              Post Event
            </button>
          </div>
        )}
        <div className={classes.pagination}>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>
          {Array(Math.ceil(events.length / eventsPerPage)).fill(null).map((_, idx) => (
            <button key={idx} onClick={() => paginate(idx + 1)} className={currentPage === idx + 1 ? classes.activePage : ''}>
              {idx + 1}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(events.length / eventsPerPage)}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Events;

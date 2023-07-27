# Assignment 3(A3)

* *Date Created*: 23 July 2023
* *Last Modification Date*: 26 July 2023
* *A3 Assignemnt Individual Repo URL*: https://git.cs.dal.ca/dlad/csci-5709-grp-14/-/tree/rohin-sharma?ref_type=heads
* *Group Project Repo URL*: https://git.cs.dal.ca/dlad/csci-5709-grp-14
* *Website URL*: https://remarkable-sprite-930713.netlify.app/
* *Backend URL*: https://sneakerama-backend.onrender.com/

## Author

* [Rohin Ashwinkumar Sharma](rh851598@dal.ca) - *(Maintainer)*

## Event Management Module
### Backend
#### APIs(eventRoutes.js):
- GET("/events"): This API retrieves all events from the "events" collection in the MongoDB.
- GET("/event/:id"): This API retrieves a selected event by their ID from the "events" collection in the MongoDB.
- Post("/event"): This API adds new event to the "events" collection in the MongoDB.
- POST("/registerevent"): This API adds user details to the "eventregistrations" collection in MongoDB along with event identifiers.

#### Models:
- EventModel.js: It defines schema for events in the MongoDB
- EventRegistration.js: It defines schema for event registration collection in the MongoDB

### Frontend
##### Pages
- NewEvent.js: It can be accessed through Post Event Button which will only be available to Sellers. A buyer cannont post an Event on the website. It allows seller to create a new event.
- MainEvent.js: It shows the event page which user has selected. User can view all the details about the event on this page. This page also gives option to register for the event. Event Registration is open for all users.
- Events.js: It shows all the events that sellers have posted on the Sneakerama. It also has post event button available when a seller is logged in.
- EventRegistration.js: It allows user to register for a event. It takes basic user information and stores them along with event id and name in the database.

-- Note: Validation is added for fields of both new event and event registration forms. 

#### Services
- events.js: It contains functions which makes call to backend api for events and return response of the apis according to frontend.

## References


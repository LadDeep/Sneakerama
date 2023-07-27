# Assignment 3(A3)

* *Date Created*: 21 July 2023
* *Last Modification Date*: 26 July 2023
* *A3 Assignemnt Individual Repo URL*: https://git.cs.dal.ca/dlad/csci-5709-grp-14/-/tree/rohin-sharma?ref_type=heads
* *Group Project Repo URL*: https://git.cs.dal.ca/dlad/csci-5709-grp-14
* *Website URL*[2]: https://remarkable-sprite-930713.netlify.app/
* *Backend URL*[3]: https://sneakerama-backend.onrender.com/

## Author

* [Rohin Ashwinkumar Sharma](rh851598@dal.ca) - *(Maintainer)*

## Event Management Module
### Backend
#### APIs(eventRoutes.js)[1]:
- GET("/events"): This API endpoint retrieves all events from the "events" collection within the MongoDB database.
- GET("/event/:id"): This endpoint fetches a specific event by its ID from the "events" collection in the MongoDB database.
- POST("/event"): Through this endpoint, a new event is added to the "events" collection in MongoDB.
- POST("/registerevent"): This API endpoint captures user details and adds them to the "eventregistrations" collection in MongoDB, ensuring the event identifiers are also stored.

#### Models:
- EventModel.js: It defines schema for events in the MongoDB
- EventRegistration.js: It defines schema for event registration collection in the MongoDB

### Frontend
##### Pages
- NewEvent.js: Accessible via the "Post Event" button, this page is exclusively available to sellers. Buyers are restricted from posting events on Sneakerama. It allows seller to create a new event.
- MainEvent.js: It shows the event page which user has selected. User can view all the details about the event on this page. This page also gives option to register for the event. Event Registration is open for all users.
- Events.js: It shows all the events that sellers have posted on the Sneakerama. It also has post event button available when a seller is logged in.
(Seller Credentials for testing: seller@dal.ca, password: Password@123)
- EventRegistration.js: It allows user to register for a event. It takes basic user information and stores them along with event id and name in the database.

-- Note: Validation is added for fields of both new event and event registration forms. 

#### Services
- events.js: This service file hosts functions responsible for interfacing with the backend APIs related to events. They handle calls to the backend and process the responses in a manner suitable for the frontend.

#### CSS

##### The Event Management uses CSS modules to ensure that each page within the module have aesthetic look and resonates with user.

- Events.module.css: This css is used for the design and layout of the Events page, ensuring the presentation of events is both clear and engaging.

- NewEvent.module.css: This css is utilized by the NewEvent page, this CSS module is made to streamline the user interface, making the event creation process easy for sellers.

- EventRegistration.module.css: This css focuses on providing a seamless registration experience, ensuring that user inputs are clearly specified and easy to register for user.

- MainEvent.module.css: This CSS module is used for the look and feel of the MainEvent page. It is optimized to present event details in an organized and captivating manner.

## References
[1]  "T7V1: NodeJS and Express Option (Live Tutorial)," Brightspace - Dalhousie University.https://dal.brightspace.com/d2l/le/content/274269/viewContent/3608669/View. [Accessed on: July 23, 2023]

[2]   “Develop and deploy websites and apps in record time,” Netlify. https://www.netlify.com/?attr=homepage-modal. [Accessed July 24, 2023]

[3]   “Cloud Application Hosting for Developers - Render,” Render. https://render.com/. [Accessed July 25, 2023]

‌  
‌

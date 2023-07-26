const express = require('express');
const Events = require('../Models/EventModel');
const EventRegistrations = require('../Models/EventRegistrationModel');
const router = express.Router();

// GET all events
router.get('/events', async (req, res) => {
    try {
        const events = await Events.find(); 
        if (!events || events.length === 0) {
            return res.status(404).json({ success: false, message: "No events found" });
        }

        res.status(200).json({success: true, eventslist: events});
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching events", error });
    }
});

// GET a specific event by ID
router.get('/event/:id', async (req, res) => {
    try {
        const event = await Events.findById(req.params.id);

        if (!event) {
            return res.status(404).json({success: false, message: "Event not found" });
        }

        res.status(200).json({success: true, event: event});
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching the event", error });
    }
});

router.post('/event', async (req, res) => {
    try {
        const { eventName, eventImage, eventDate, eventTime, eventLocation, eventDescription } = req.body;

        if (!eventName || !eventImage || !eventDate || !eventTime || !eventLocation || !eventDescription) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new event using the Mongoose model
        const newEvent = new Events({
            eventName,
            eventImage,
            eventDate,
            eventTime,
            eventLocation,
            eventDescription
        });

        // Save the event to the database
        await newEvent.save();

        res.status(201).json({success: true, event:newEvent, message:"New Event Posted!"});
    } catch (error) {
        res.status(500).json({ message: "Error creating the event", error: error.message });
    }
});

router.post('/registerevent', async (req, res) => {
    try {
        const { eventID, eventName, name, age, phone, email } = req.body;

        if (!eventID || !eventName || !name || !age || !phone || !email) {
            return res.status(400).json({success: false, message: "All fields are required" });
        }

        // Create a new registration using the model
        const newRegistration = new EventRegistrations({
            eventID,
            eventName,
            name,
            age,
            phone,
            email
        });

        // Save the registration to the database
        await newRegistration.save();

        res.status(201).json({success: true, registered: newRegistration, message:"Event Registration Successful"});
    } catch (error) {
        res.status(500).json({ message: "Error registering for the event", error: error.message });
    }
});

module.exports = router;


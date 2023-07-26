const mongoose = require('mongoose');

const dbSchema = new mongoose.Schema({
    eventName: {
        required: true,
        type: String
    },
    eventImage: {
        required: true,
        type: String
    },
    eventDate: {
        required: true,
        type: Date
    },
    eventTime: {
        required: true,
        type: String
    },
    eventLocation: {
        required: true,
        type: String
    },
    eventDescription: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('event', dbSchema)
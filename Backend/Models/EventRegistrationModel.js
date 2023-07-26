const mongoose = require('mongoose');

const eventRegistrationSchema = new mongoose.Schema({
    eventID: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events'
    },
    eventName: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    phone: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('eventRegistrations', eventRegistrationSchema);

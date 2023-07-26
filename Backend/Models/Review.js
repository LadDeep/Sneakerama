const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    rating: {
        required: true,
        type: Number
    },
    title: {
        required: true,
        type: String
    },
    review: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('review', dataSchema)
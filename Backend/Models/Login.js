const mongoose = require('mongoose');

const login = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    }
});
const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: false
    },
    termsAndConditions: {
        type: Boolean,
        required: true
    },
    userQuestion: {
        type: String,
        required: true
    },
    userAnswer: {
        type: String,
        required: true
    },
    Seller: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('Signup', signupSchema);
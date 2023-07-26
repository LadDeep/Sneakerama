const mongoose = require('mongoose');
//Model for Payment
const paymentSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type: String
    },
    province: {
        required: true,
        type: String
    },
    postalCode: {
        required: true,
        type: String
    },
    phone: {
        required: false,
        type: String
    },
})

module.exports = mongoose.model('Payment', paymentSchema)

/*Dhruv Kothari*/

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  orderItems: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  quantities: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Order', orderSchema)

const express = require('express');
const  Order = require('../Models/Order');
const router = express.Router()
require('dotenv').config();

const bodyParser = require('body-parser');

// Increase the payload size limit to 10MB
router.use(bodyParser.json({ limit: '10mb' }));

// Route for storing order details
router.post('/orders', async (req, res) => {
    const body = req.body;
    console.log(body);
  
    // Assuming you have an Order model defined with the required schema
    const order = new Order({
      username: body.username,
      orderItems: body.orderItems,
      createdAt: new Date() // Set the current date for the createdAt field
    });
  
    try {
      const savedOrder = await order.save();
      return res.status(200).json(savedOrder);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  
module.exports = router;

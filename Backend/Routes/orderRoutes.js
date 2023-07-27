/*Dhruv Kothari*/

const express = require('express');
const Order = require('../Models/Order');
const router = express.Router()
require('dotenv').config();

const bodyParser = require('body-parser');

router.use(bodyParser.json({ limit: '10mb' }));

// Route for storing order details
router.post('/orders', async (req, res) => {
  const body = req.body;
  console.log(body);

  const order = new Order({
    username: body.username,
    orderItems: body.orderItems,
    total: body.total,
    createdAt: new Date() 
  });

  try {
    const savedOrder = await order.save();
    return res.status(200).json(savedOrder);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Route for storing order details
router.get('/orders/:email', async (req, res) => {
  const email = req.params.email;
  console.log("email: " + email);
  try {
    const orders = await Order.find({ username: email });
    console.log(orders)
    return res.status(200).json({ orders: orders });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;

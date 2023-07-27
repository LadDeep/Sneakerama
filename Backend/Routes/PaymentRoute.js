const express = require('express');
const  Payment = require('../Models/Payment');
const router = express.Router()
require('dotenv').config();
//Route for Payment

router.post('/payment', async (req, res) => {
    const body = req.body;
    console.log(body)
    const payment = new Payment({
        firstName: body.firstName,
        lastName: body.lastName,
        address: body.address,
        city: body.city,
        province: body.province,
        postalCode: body.postalCode,
        phone: body.phone,
    })
    try {
        const dataToSave = await payment.save();
        return res.status(200).json(dataToSave)
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
})
module.exports = router;
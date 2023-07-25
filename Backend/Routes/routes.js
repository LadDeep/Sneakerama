const express = require('express');
const Review = require('../Models/Review');
const SignupPayload = require('../Models/signup');
const loginPayload = require('../Models/login');
const router = express.Router()

//Sample root method
router.get('/', async (req, res) => {
    res.send('Hello Sneakerheads!')
})

//get all reviews
router.get('/getReviews', async (req, res) => {
    try {
        const reviews = await Review.find()
        console.log(reviews)
        return res.status(200).json({
            success: true,
            data: reviews
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

//add review
router.post('/addReview', async (req, res) => {
    const body = req.body;
    console.log(body)
    const review = new Review({
        name: body.name,
        rating: body.rating,
        title: body.title,
        review: body.review
    })
    try {
        const dataToSave = await review.save();
        return res.status(200).json(dataToSave)
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

//create a user
router.post('/auth/signup', async (req, res) => {
    const body = req.body;
    console.log(body)
    const signupPayload = new SignupPayload({
        email: body.email,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
        addressLine1: body.addressLine1,
        addressLine2: body.addressLine2,
        gender:body.gender,
        dateOfBirth:body.dateOfBirth,
        city: body.city,
        state: body.state,
        country: body.country,
        phoneNumber: body.phoneNumber,
        userQuestion: body.userQuestion,
        userAnswer: body.userAnswer,
        termsAndConditions: body.termsAndConditions,
        Seller: body.Seller
    })
    try {
        const createUser = await signupPayload.save();
        return res.status(200).json(createUser)
    }
    catch (error) {
        if (error.code === 11000) {
            // Duplicate key error (email already exists)
            return res.status(409).json({ message: 'Email already registered' });
          }
        return res.status(400).json({ message: error.message })
    }
}
)

module.exports = router
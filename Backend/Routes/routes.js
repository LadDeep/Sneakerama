const express = require('express');
const Review = require('../Models/Review');

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

module.exports = router
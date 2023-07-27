const express = require('express');
const Review = require('../Models/Review');
const SignupPayload = require('../Models/UserDetails');
const router = express.Router()
const LoginPayload = require('../Models/UserDetails');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
require('dotenv').config();

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
        Seller: body.Seller,
        isVerifiedSeller: body.isVerifiedSeller,
        isAdmin: body.isAdmin
    })
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(signupPayload.password, saltRounds);
    signupPayload.password = hashedPassword;
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

//login
router.post('/auth/login', async (req, res) => {
    console.log("inside login");
    const creds = req.body;
    console.log(creds);
    try {
        const users = await LoginPayload.findOne({ email: creds.email });
        const passwordMatch = await bcrypt.compare(creds.password, users.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const tokenPayload= {
            email: creds.email,
            isAdmin: users.isAdmin,
            isSeller: users.Seller,
            isVerifiedSeller: users.isVerifiedSeller,
            name: users.firstName + " " + users.lastName,
            wishlist: users.wishlist,
            cart: users.cart
        }
        const accessToken = await JWT.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        console.log(accessToken);
        return res.status(200).json({
            success: true,
            data: users,
            accessToken: accessToken
        });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  });

//get user details
router.post('/auth/getCurrentUser', async (req, res) => {
    try {
        const token=req.body.token;
        console.log(token);
        const currentUser = JWT.decode(req.body.token, process.env.ACCESS_TOKEN_SECRET);
        console.log(currentUser); // Log the decoded payload
        return res.status(200).json({
            success: true,
            data: currentUser
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
  });

//get a user
router.post('/auth/getUser', async (req, res) => {
    const email = req.body.email;
    console.log(email);

    try {
      const users = await LoginPayload.findOne({ email: email });
        console.log(users);
        const questionanser = {
            userQuestion: users.userQuestion,
            userAnswer: users.userAnswer
        }
      return res.status(200).json({
        success: true,
        data: questionanser,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    }
);

//change password
router.put('/auth/changePassword', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try{
        const users=await SignupPayload.findOneAndUpdate({email:email},{$set:{password:hashedPassword}});
        console.log(users);
        return res.status(200).json({
            success: true,
            data: users,
        });

    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
);


  
module.exports = router
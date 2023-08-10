const express = require('express');
const router = express.Router();
const SellerData = require('../Models/UserDetails');
const UserData = require('../Models/UserDetails');

router.get('/count-sellers', async (req, res) => {
    try {
        const count = await SellerData.countDocuments({ Seller: true });
        res.status(200).json({count: count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/count-verified-sellers', async (req, res) => {
    try {
        const count = await SellerData.countDocuments({ isVerifiedSeller: true });
        res.status(200).json({count: count});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/count-unverified-sellers', async (req, res) => {
    try {
        const count = await SellerData.countDocuments({ Seller: true,isVerifiedSeller: false });
        res.status(200).json({count: count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/verify-seller/:id', async (req, res) => {
    try {
        const seller = await SellerData.findByIdAndUpdate(
            req.params.id,
            { isVerifiedSeller: true });
        if (!seller) {
            return res.status(404).json({success:false, message: 'Seller not found' });
        }
        res.status(200).json({success:true, message:'Seller Verified', verifiedSeller:seller});
    } catch (err) {
        res.status(500).json({success:false, message: err.message });
    }
});


router.get('/all-pending-sellers', async (req, res) => {
    try {
        const sellers = await SellerData.find({ Seller: true,isVerifiedSeller: false });
        res.status(200).json({sellerlist: sellers});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/admin-user', async (req, res) => {
    try {
        const adminUser = await UserData.find({ isAdmin: true });
        res.status(200).json({ user: adminUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/update-user/:id', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            addressLine1,
            addressLine2,
            city,
            state,
            country,
            phoneNumber,
            email
        } = req.body;

        const updatedUser = await UserData.findByIdAndUpdate(
            req.params.id,
            {
                firstName,
                lastName,
                dateOfBirth,
                gender,
                addressLine1,
                addressLine2,
                city,
                state,
                country,
                phoneNumber,
                email
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({success: false, message: 'User not found'});
        }

        res.status(200).json({success: true, message: 'User information updated', user: updatedUser});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
});

module.exports = router;


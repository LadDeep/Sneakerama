const express = require('express');
const router = express.Router();
const SellerData = require('../Models/UserDetails');

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
        res.status(200).json({ count });
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


router.put('/verify-seller/:id', async (req, res) => {
    try {
        const seller = await SellerData.findByIdAndUpdate(
            req.params.id,
            { isVerifiedSeller: true },
            { new: true }
        );
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        res.status(200).json({verifiedSeller:seller});
    } catch (err) {
        res.status(500).json({ message: err.message });
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

module.exports = router;


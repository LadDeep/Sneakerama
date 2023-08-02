require("dotenv").config();
const express = require("express");
const router = express.Router();
const Product = require("../Models/Products");
const bodyParser = require("body-parser");

router.use(bodyParser.json({ limit: "10Mb" }));

//Route to get all products with the Array of Ids
router.get('/wishlist', async (req, res) => {
    const { ids } = req.query;
    console.log(ids);

    if (!ids) {
        return res.status(400).json({ error: 'Invalid or missing product IDs' });
    }

    // Split the comma-separated string of IDs into an array
    const idArray = ids.split(',');

    try {
        const products = await Product.find({ _id: { $in: idArray } });
        console.log(products)

        if (!products || products.length === 0) {
            return res.status(404).json({ error: 'Products not found' });
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;

require("dotenv").config();
const express = require("express");
const router = express.Router();
const Product = require("../Models/Products");
const bodyParser = require("body-parser");

router.use(bodyParser.json({ limit: "100Mb" }));

// Route to create a new product
router.post("/addProduct", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = new Product(newProduct);
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ error: "Unable to create product" });
  }
});

// Route to get all products
router.post("/products", async (req, res) => {
  const { email } = req.body;
  try {
    const { offset = 0, limit = 10 } = req.query;
    const products = await Product.find({email})
      .skip(parseInt(offset))
      .limit(parseInt(limit));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products." });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch products" });
  }
});

router.get("/products/filter", async (req, res) => {
  try {
    const { brand, model, category, gender, size } = req.query;
    const filters = {};

    if (brand) filters.brand = brand;
    if (model) filters.model = model;
    if (category) filters.category = category;
    if (gender) filters.gender = gender;
    if (size) filters["availableSizes.size"] = size;

    const products = await Product.find(filters);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to filter products." });
  }
});

router.post("/products/count", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Seller's email is required in the request body" });
  }

  try {
    const count = await Product.countDocuments({ email });
    res.json({ count });
  } catch (err) {
    console.error("Error counting products:", err);
    res.status(500).json({ error: "Error counting products" });
  }
});

// Route to edit a product
router.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });
    if (product) {
      res
        .status(200)
        .json({ message: "Product updated successfully", product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to update product" });
  }
});
router.get('/product', async (req, res) => {
  const { ids } = req.query;
  console.log(ids);

  if (!ids) {
    return res.status(400).json({ error: 'Invalid or missing product IDs' });
  }

  const idArray = ids.split(',');

  console.log(idArray,"idArray")

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

router.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to delete product" });
  }
});

router.get("/product/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch product" });
  }
}
);

module.exports = router;

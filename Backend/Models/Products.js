const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // email: {required: true, type: String} //mighted be required for managing specific sellers
  brand: { required: true, type: String },
  model: { required: true, type: String },
  description: { required: true, type: String },
  gender: { required: true, type: String },
  category: { required: true, type: String },
  image: { required: true, type: [String] },
  price: { required: true, type: Number },
  color: { required: true, type: String },
  availableSizes: [
    {
      size: { required: true, type: String },
      quantity: {
        required: true,
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);

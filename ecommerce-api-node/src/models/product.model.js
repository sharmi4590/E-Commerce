const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensure price is non-negative
  },
  discountedPrice: {
    type: Number,
    min: 0, // Ensure discounted price is non-negative
  },
  discountPercent: {
    type: Number,
    min: 0, // Ensure discount percent is non-negative
    max: 100, // Ensure it doesn't exceed 100%
  },
  quantity: {
    type: Number,
    required: true,
    min: 0, // Ensure quantity is non-negative
  },
  brand: {
    type: String,
  },
  color: {
    type: String,
  },
  sizes: [
    {
      name: { type: String, required: true }, // Require size name
      quantity: { type: Number, required: true, min: 0 }, // Require size quantity
    },
  ],
  imageUrl: {
    type: String,
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating", // Use singular reference
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review", // Use singular reference
    },
  ],
  numRatings: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Use singular reference
    required: true, // Require category
  },
}, { timestamps: true }); // Enable timestamps for createdAt and updatedAt

const Product = mongoose.model("Product", productSchema); // Use singular model name
module.exports = Product;

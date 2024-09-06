const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart", // Changed to singular
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Changed to singular
    required: true,
  },
  size: {
    type: String,
    required: true,
    // Optional: Add validation for size
    // enum: ['S', 'M', 'L', 'XL'], // Example for restricted sizes
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Changed to singular
    required: true,
  },
}, { timestamps: true }); // Enable timestamps

const CartItem = mongoose.model("CartItem", cartItemSchema); // Use singular model name
module.exports = CartItem;

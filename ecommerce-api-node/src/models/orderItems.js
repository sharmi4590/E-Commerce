const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderItemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Changed to singular
        required: true,
    },
    size: {
        type: String,
        // Optional: Add validation for size if needed
        maxlength: 50, // Example max length validation
    },
    quantity: {
        type: Number,
        required: true,
        min: 1, // Ensure quantity is at least 1
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Ensure price is non-negative
    },
    discountedPrice: {
        type: Number,
        required: true,
        min: 0, // Ensure discounted price is non-negative
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Changed to singular
        required: true,
    },
}, { timestamps: true }); // Enable timestamps

const OrderItem = mongoose.model('OrderItem', orderItemSchema); // Use singular model name
module.exports = OrderItem;

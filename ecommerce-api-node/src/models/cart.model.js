const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Changed to singular
        required: true,
    },
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem', // Changed to singular
        required: true,
    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    totalItem: {
        type: Number,
        required: true,
        default: 0,
    },
    totalDiscountedPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    discount: { // Corrected field name
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true }); // Enable timestamps

const Cart = mongoose.model('Cart', cartSchema); // Use singular model name
module.exports = Cart;

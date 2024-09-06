const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Changed to singular
        required: true, // Made required for better integrity
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem', // Changed to singular
        required: true, // Made required for better integrity
    }],
    orderDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    deliveryDate: {
        type: Date,
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address', // Changed to singular
        required: true, // Made required for better integrity
    },
    paymentDetails: {
        paymentMethod: {
            type: String,
        },
        transactionId: {
            type: String,
        },
        paymentId: {
            type: String,
        },
        paymentStatus: {
            type: String,
            default: "PENDING",
        },
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    totalDiscountedPrice: {
        type: Number,
        required: true,
    },
    discount: { // Corrected field name
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String, // Changed to String for better consistency
        required: true,
        default: "PENDING",
    },
    totalItem: {
        type: Number,
        required: true,
        min: 0, // Added validation for non-negative count
    },
}, { timestamps: true }); // Enable timestamps

const Order = mongoose.model('Order', orderSchema); // Use singular model name
module.exports = Order;

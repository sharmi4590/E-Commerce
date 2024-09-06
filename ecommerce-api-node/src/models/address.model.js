const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String, // Changed to String for leading zeros
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User", // Ensure this matches your User model name
    },
    mobile: {
        type: String,
        required: true,
        // Optional: Add regex validation for mobile number format
        // match: /^[0-9]{10}$/, // Example: Ensure it's a 10-digit number
    }
});

const Address = mongoose.model("Address", AddressSchema); // Use singular model name
module.exports = Address;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        match: /.+\@.+\..+/ // Simple regex for email validation
    },
    role: {
        type: String,
        required: true,
        default: "CUSTOMER",
    },
    mobile: {
        type: String,
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address", // Ensure this matches your Address model name
    }],
    paymentInformation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentInformation", // Ensure this matches your Payment model name
    }],
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating", // Ensure this matches your Rating model name
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review", // Ensure this matches your Review model name
    }],
}, { timestamps: true }); // Enable timestamps

const User = mongoose.model("User", userSchema); // Use singular model name
module.exports = User;

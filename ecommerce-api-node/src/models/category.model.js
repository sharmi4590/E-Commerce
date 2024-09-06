const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Changed to singular
    },
    level: {
        type: Number,
        required: true,
        // Optional: Add validation for level
        // min: 0, // Example for ensuring non-negative levels
    },
}, { timestamps: true }); // Enable timestamps

const Category = mongoose.model('Category', categorySchema); // Use singular model name
module.exports = Category;

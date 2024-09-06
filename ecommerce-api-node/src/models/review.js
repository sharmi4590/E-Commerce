const mongoose = require('mongoose');

const { Schema } = mongoose;

const ratingSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Use singular reference
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Use singular reference
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1, // Ensure rating is at least 1
    max: 5, // Ensure rating does not exceed 5
  },
}, { timestamps: true }); // Enable timestamps for createdAt and updatedAt

const Rating = mongoose.model('Rating', ratingSchema); // Use singular model name
module.exports = Rating;

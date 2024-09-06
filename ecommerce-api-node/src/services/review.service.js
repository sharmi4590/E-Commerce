const Review = require("../models/review.js");
const productService = require("../services/product.service.js");

async function createReview(reqData, user) {
  const product = await productService.findProductById(reqData.productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const review = new Review({
    user: user._id,
    product: product._id,
    review: reqData.review,
    createdAt: new Date(),
  });

  // Save the review
  const savedReview = await review.save();

  // Optionally, you can update the product to include a reference to the review
  // product.reviews.push(savedReview._id);
  // await product.save();

  return savedReview; // Return the saved review
}

async function getAllReview(productId) {
  const product = await productService.findProductById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  return await Review.find({ product: productId }).populate("user");
}

module.exports = {
  createReview,
  getAllReview,
};

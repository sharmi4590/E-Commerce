const Rating = require("../models/rating.model.js");
const productService = require("../services/product.service.js");

async function createRating(req, user) {
  // Validate the rating
  if (req.rating < 1 || req.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const product = await productService.findProductById(req.productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const rating = new Rating({
    product: product._id,
    user: user._id,
    rating: req.rating,
    createdAt: new Date(),
  });

  return await rating.save();
}

async function getProductRating(productId) {
  const ratings = await Rating.find({ product: productId });

  if (!ratings || ratings.length === 0) {
    return { ratings: [], averageRating: null };
  }

  const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  const averageRating = (totalRating / ratings.length).toFixed(1);

  return { ratings, averageRating };
}

module.exports = {
  createRating,
  getProductRating,
};

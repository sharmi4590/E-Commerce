const reviewService = require("../services/review.service");

const createReview = async (req, res) => {
    const user = req.user;
    if (!user || !user._id) {
        return res.status(400).send({ error: "User not found" });
    }

    try {
        const review = await reviewService.createReview(req.body, user);
        return res.status(201).send(review); // 201 for created resource
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const getAllReview = async (req, res) => {
    const productId = req.params.productId;
    const user = req.user; // User might be optional for this function, depending on your use case
    try {
        const reviews = await reviewService.getAllReview(productId); // Fixed typo here
        return res.status(200).send(reviews); // 200 for successful retrieval
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createReview,
    getAllReview
};

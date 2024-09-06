const ratingService = require("../services/rating.service");

const createRating = async (req, res) => {
    const user = req.user;
    if (!user || !user._id) {
        return res.status(400).send({ error: "User not found" });
    }

    try {
        const review = await ratingService.createRating(req.body, user);
        return res.status(201).send(review); // 201 for created resource
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const getAllRatings = async (req, res) => {
    const productId = req.params.productId;
    const user = req.user; // User might be optional for this function, depending on your use case
    try {
        const reviews = await ratingService.getAllRatings(productId);
        return res.status(200).send(reviews); // 200 for successful retrieval
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createRating,
    getAllRatings
};

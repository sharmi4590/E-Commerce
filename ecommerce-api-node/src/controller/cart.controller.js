const cartService = require("../services/cart.service");

async function createCart(req, res) {
    try {
        const userId = req.user._id; // Get the user ID from the authenticated request
        const cart = await cartService.createCart(userId);
        return res.status(201).json(cart); // Return the created cart
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function findUserCart(req, res) {
    try {
        const userId = req.user._id;
        const cart = await cartService.findUserCart(userId);
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function addItemToCart(req, res) {
    try {
        const userId = req.user._id; // Get user ID from authenticated request
        const cartItemData = req.body; // Get item data from request body
        const message = await cartService.addCartItem(userId, cartItemData);
        return res.status(200).json({ message });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createCart,
    findUserCart,
    addItemToCart,
};

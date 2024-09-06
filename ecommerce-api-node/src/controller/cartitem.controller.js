const cartItemService = require("../services/cartitem.service.js");

const updateCartItem = async (req, res) => {
    const user = await req.user;
    if (!user || !user._id) {
        return res.status(400).send({ error: "User not found" });
    }

    try {
        const updatedCartItem = await cartItemService.updateCartItem(user._id, req.params.id, req.body);
        return res.status(200).send(updatedCartItem); // Fixed the variable name
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const removeCartItem = async (req, res) => {
    const user = req.user;
    if (!user || !user._id) {
        return res.status(400).send({ error: "User not found" });
    }

    try {
        await cartItemService.removeCartItem(user._id, req.params.id);
        return res.status(200).send({ message: "Cart item removed successfully" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = { updateCartItem, removeCartItem };

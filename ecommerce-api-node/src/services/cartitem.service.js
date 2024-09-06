const CartItem = require("../models/cartItem.model.js");
const userService = require("../services/user.service.js");

async function updateCartItem(userId, cartItemId, cartItemData) {
    try {
        const item = await findCartItemById(cartItemId); // Ensure this function is correctly implemented
        if (!item) {
            throw new Error("Cart item not found: " + cartItemId);
        }
        const user = await userService.findUserById(item.userId);
        if (!user) {
            throw new Error("User not found: " + userId);
        }
        if (user._id.toString() === userId.toString()) {
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedPrice = item.quantity * item.product.discountedPrice;
            const updatedCartItem = await item.save();
            return updatedCartItem;
        } else {
            throw new Error("You can't update this cart item");
        }
    } catch (error) {
        throw new Error(error.message); // No need to wrap in an object
    }
}

async function removeCartItem(userId, cartItemId) {
    try {
        const cartItem = await findCartItemById(cartItemId); // Correctly retrieve the cart item
        if (!cartItem) {
            throw new Error("Cart item not found: " + cartItemId);
        }
        
        const user = await userService.findUserById(userId);
        if (!user) {
            throw new Error("User not found: " + userId);
        }

        if (user._id.toString() === cartItem.userId.toString()) {
            await CartItem.findByIdAndDelete(cartItemId);
            return "Cart item removed successfully"; // Optionally return a success message
        } else {
            throw new Error("You cannot remove another user's item");
        }
    } catch (error) {
        throw new Error(error.message); // No need to wrap in an object
    }
}

async function findCartItemById(cartItemId) {
    try {
        const cartItem = await CartItem.findById(cartItemId).populate("product"); // Correctly call the CartItem model
        if (cartItem) {
            return cartItem;
        } else {
            throw new Error("Cart item not found with id: " + cartItemId);
        }
    } catch (error) {
        throw new Error("Error retrieving cart item: " + error.message);
    }
}

module.exports = {
    updateCartItem,
    removeCartItem,
    findCartItemById,
};

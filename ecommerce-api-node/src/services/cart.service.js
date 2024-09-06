const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

async function createCart(userId) {
    try {
        const cart = new Cart({ user: userId });
        const createdCart = await cart.save();
        return createdCart;
    } catch (error) {
        throw new Error(error.message); // No need to wrap in an object
    }
}

async function findUserCart(userId) {
    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error("Cart not found");
        }
        let cartItems = await CartItem.find({ cart: cart._id }).populate("product");
        cart.cartItems = cartItems;
        
        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;

        for (let cartItem of cart.cartItems) {
            totalPrice += cartItem.price * cartItem.quantity; // Adjusted to calculate total price correctly
            totalDiscountedPrice += cartItem.discountedPrice * cartItem.quantity; // Adjusted for discounted price
            totalItem += cartItem.quantity;
        }

        cart.totalPrice = totalPrice;
        cart.totalItem = totalItem;
        cart.discount = totalPrice - totalDiscountedPrice;

        return cart;
    } catch (error) {
        throw new Error(error.message); // No need to wrap in an object
    }
}

async function addCartItem(userId, req) {
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error("Cart not found");
        }

        const product = await Product.findById(req.productId);
        if (!product) {
            throw new Error("Product not found");
        }

        const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId });
        if (!isPresent) {
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.price,
                size: req.size,
                discountedPrice: product.discountedPrice,
            });

            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();
            return "Item added to cart";
        } else {
            return "Item already in cart"; // Handle case when item is already present
        }
    } catch (error) {
        throw new Error(error.message); // No need to wrap in an object
    }
}

module.exports = { createCart, findUserCart, addCartItem };

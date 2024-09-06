const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const OrderItem = require("../models/orderItems.js");
const cartService = require("../services/cart.service.js");

async function createOrder(user, shippingAddress) {
    let address;
    
    if (shippingAddress._id) {
        address = await Address.findById(shippingAddress._id);
        if (!address) {
            throw new Error("Shipping address not found.");
        }
    } else {
        address = new Address(shippingAddress);
        address.user = user._id; // Ensure the address references the user ID
        await address.save();
        user.address.push(address); // Correctly push to addresses array
        await user.save();
    }

    const cart = await cartService.findUserCart(user._id);
const orderItems = [];
let totalDiscountedPrice = 0; // Initialize discounted price

for (const item of cart.cartItems) {
    const orderItem = new OrderItem({
        price: item.price,
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        userId: item.userId,
        discountedPrice: item.discountedPrice,
    });
    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);

    // Add to total discounted price
    totalDiscountedPrice += item.discountedPrice * item.quantity;
}

const discount = cart.totalPrice - totalDiscountedPrice; // Calculate discount

const createdOrder = new Order({
    user: user._id,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice, // Use calculated total discounted price
    discount, // Use calculated discount
    totalItem: cart.totalItem,
    shippingAddress: address._id, // Use address ID
});

return await createdOrder.save(); // Save and return the created order
// Use address ID
  

//return await createdOrder.save(); // Save and return the created order
}

async function placeOrder(orderId) {
    const order = await findOrderById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }

    order.orderStatus = "PLACED";
    order.paymentDetails.status = "COMPLETED";
    return await order.save();
}

async function confirmedOrder(orderId) {
    const order = await findOrderById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }

    order.orderStatus = "CONFIRMED";
    return await order.save();
}

async function shipOrder(orderId) {
    const order = await findOrderById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }

    order.orderStatus = "SHIPPED";
    return await order.save();
}

async function deliverOrder(orderId) {
    const order = await findOrderById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }

    order.orderStatus = "DELIVERED";
    return await order.save();
}

async function cancelOrder(orderId) {
    const order = await findOrderById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }

    order.orderStatus = "CANCELLED";
    return await order.save();
}

async function findOrderById(orderId) {
    const order = await Order.findById(orderId)
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippingAddress");
    
    if (!order) {
        throw new Error("Order not found");
    }

    return order;
}

async function usersOrderHistory(userId) {
    try {
        const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
            .populate({ path: "orderItems", populate: { path: "product" } })
            .lean();

        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getAllOrders() {
    return await Order.find()
        .populate({ path: "orderItems", populate: { path: "product" } })
        .lean();
}

async function deleteOrder(orderId) {
    const order = await findOrderById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }
    
    await Order.findByIdAndDelete(order._id);
    return "Order deleted successfully"; // Optionally return a success message
}

module.exports = {
    createOrder,
    placeOrder,
    confirmedOrder,
    shipOrder,
    deliverOrder,
    cancelOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrders,
    deleteOrder,
};

const orderService = require("../services/order.service.js");

const createOrder = async (req, res) => {
    const user =await req.user;
    if (!user || !user._id) {
        return res.status(400).send({ error: "User not found" });
    }

    try {
        const createdOrder = await orderService.createOrder(user, req.body);
        return res.status(201).send(createdOrder); // 201 for created resource
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const findOrderById = async (req, res) => {
    const user =await req.user;
    if (!user || !user._id) {
        return res.status(400).send({ error: "User not found" });
    }

    try {
        const orderId = req.params.id; // Assuming order ID is in the URL params
        const foundOrder = await orderService.findOrderById(user, orderId);
        return res.status(200).send(foundOrder); // 200 for successful retrieval
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const orderHistory = async (req, res) => {
    const user = await req.user;
    if (!user || !user._id) {
        return res.status(400).send({ error: "User not found" });
    }

    try {
        const orderHistory = await orderService.usersOrderHistory(user);
        return res.status(200).send(orderHistory); // 200 for successful retrieval
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createOrder,
    findOrderById,
    orderHistory
};

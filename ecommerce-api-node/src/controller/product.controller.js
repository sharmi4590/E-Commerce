const productService = require("../services/product.service.js");

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        return res.status(201).send(product); // 201 for created resource
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await productService.deleteProduct(productId);
        return res.status(200).send(deletedProduct); // 200 for successful deletion
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const updatedProduct = await productService.updateProduct(productId, req.body); // Include req.body to update product
        return res.status(200).send(updatedProduct); // 200 for successful update
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const findProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.findProductById(productId);
        return res.status(200).send(product); // 200 for successful retrieval
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts(req.query);
        return res.status(200).send(products); // 200 for successful retrieval
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const createMultipleProduct = async (req, res) => {
    try {
        await productService.createMultipleProduct(req.body);
        return res.status(201).send({ message: "Products created successfully" }); // 201 for created resource
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    createMultipleProduct,
    findProductById
};

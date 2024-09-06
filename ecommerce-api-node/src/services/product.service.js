const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(reqData) {
    // Find or create the top-level category
    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
    if (!topLevel) {
        topLevel = new Category({
            name: reqData.topLevelCategory,
            level: 1,
        });
        await topLevel.save();
    }

    // Find or create the second-level category
    let secondLevel = await Category.findOne({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id,
    });
    if (!secondLevel) {
        secondLevel = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2,
        });
        await secondLevel.save();
    }

    // Find or create the third-level category
    let thirdLevel = await Category.findOne({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id,
    });
    if (!thirdLevel) {
        thirdLevel = new Category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level: 3,
        });
        await thirdLevel.save();
    }

    // Create the product
    const product = new Product({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: reqData.discountedPrice,
        discountedPersent: reqData.discountedPersent,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price: reqData.price,
        sizes: reqData.size,
        quantity: reqData.quantity,
        category: thirdLevel._id,
    });

    return await product.save();
}

async function deleteProduct(productId) {
    const product = await findProductById(productId);
    await Product.findByIdAndDelete(productId);
    return "Product deleted successfully";
}

async function updateProduct(productId, reqData) {
    // Use findByIdAndUpdate instead of FindByIdAndUpdate (correct casing)
    const updatedProduct = await Product.findByIdAndUpdate(productId, reqData, { new: true });
    if (!updatedProduct) {
        throw new Error("Product not found");
    }
    return updatedProduct;
}

async function findProductById(id) {
    const product = await Product.findById(id).populate("category").exec();
    if (!product) {
        throw new Error("Product not found with id " + id);
    }
    return product;
}

async function getAllProducts(reqQuery) {
    let {
        category,
        color,
        sizes,
        minPrice,
        maxPrice,
        minDiscount,
        sort,
        stock,
        pageNumber = 1,
        pageSize = 10,
    } = reqQuery;

    let query = Product.find().populate("category");

    if (category) {
        const existCategory = await Category.findOne({ name: category });
        if (existCategory) {
            query = query.where("category").equals(existCategory._id);
        } else {
            return { content: [], currentPage: pageNumber, totalPages: 0 };
        }
    }

    if (color) {
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
        const colorRegex = new RegExp([...colorSet].join("|"), "i");
        query = query.where("color").regex(colorRegex);
    }

    if (sizes) {
        const sizesSet = new Set(sizes);
        query = query.where("sizes.name").in([...sizesSet]);
    }

    if (minPrice && maxPrice) { // Corrected to && for logical AND
        query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    }

    if (minDiscount) {
        query = query.where("discountedPersent").gt(minDiscount); // Fixed spelling
    }

    if (stock) {
        if (stock === "in_stock") {
            query = query.where("quantity").gt(0);
        } else if (stock === "out_of_stock") {
            query = query.where("quantity").lte(0);
        }
    }

    if (sort) {
        const sortDirection = sort === "price_high" ? -1 : 1; // Fixed typo
        query = query.sort({ discountedPrice: sortDirection });
    }

    const totalProducts = await Product.countDocuments(query);
    const skip = (pageNumber - 1) * pageSize;
    const products = await query.skip(skip).limit(pageSize).exec();
    const totalPages = Math.ceil(totalProducts / pageSize);

    return { content: products, currentPage: pageNumber, totalPages };
}

async function createMultipleProduct(products) {
    for (const product of products) {
        await createProduct(product);
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProduct,
};

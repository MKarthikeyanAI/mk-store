const productModel = require('../models/productModel');

// Fetch all products
exports.getProducts = async (req, res) => {
    try {
        const products = await productModel.find(); // Fetch from MongoDB
        res.status(200).json({
            success: true,
            products,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Fetch a single product by ID
exports.getSingleProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).json({
            success: true,
            product,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Search products by keyword
// Fetch products by keyword
exports.searchProducts = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        if (!keyword) {
            return res.status(400).json({ message: "Keyword is required" });
        }
        
        // Perform case-insensitive search using regex
        const products = await productModel.find({
            name: { $regex: keyword, $options: 'i' }
        });

        // Return the products found
        res.status(200).json({ products });
    } catch (err) {
        console.error(err); // Log the error to debug
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

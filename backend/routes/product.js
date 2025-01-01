const express = require('express');
const { getProducts, getSingleProduct, searchProducts } = require('../controllers/productController');

const router = express.Router();

router.route('/products').get(getProducts); // Fetch all products
router.route('/products/:id').get(getSingleProduct); // Fetch single product by ID
router.route('/products/search').get(searchProducts); // Search products by keyword

module.exports = router;

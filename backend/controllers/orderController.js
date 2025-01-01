const orderModel = require('../models/orderModel'); 
const productModel = require('../models/productModel');

// Create Order - /api/v1/order
exports.createOrder = async (req, res) => {
    try {
        const cartItems = req.body;
        const amount = Number(cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)).toFixed(2);
        const status = 'pending';

        // Create the order
        const order = await orderModel.create({ cartItems, amount, status });

        // Updating product stock
        for (let item of cartItems) {
            const product = await productModel.findById(item.product._id);
            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }
            product.stock = product.stock - item.qty;

            if (product.stock < 0) {
                return res.status(400).json({ success: false, message: `Not enough stock for ${product.name}` });
            }

            await product.save();
        }

        res.json({
            success: true,
            order,
        });
    } catch (err) {
        console.error(`Error: ${err.message}`);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
        });
    }
};

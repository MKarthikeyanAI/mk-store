const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productModel = require('./models/productModel');
const products = require('./data/products.json');

// Load environment variables from config.env
dotenv.config({ path: './config/config.env' });

// Seed products function
const seedProducts = async () => {
    try {
        // Connect to MongoDB
        console.log('DB_URL:', process.env.DB_URL); // Debugging log
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected for seeding!');

        // Clear existing products
        await productModel.deleteMany();
        console.log('Existing products deleted!');

        // Insert new products
        await productModel.insertMany(products);
        console.log('Products seeded successfully!');

        process.exit(); // Exit script
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

// Run the script
seedProducts();

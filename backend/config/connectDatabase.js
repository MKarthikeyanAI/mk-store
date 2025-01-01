const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const con = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit on failure
    }
};

module.exports = connectDatabase;

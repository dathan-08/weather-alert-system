const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log('DB Connected');
    } catch (err) {
        console.log("MongoDB connection error",err);
        process.exit(1);
    }
};

module.exports = connectDB;
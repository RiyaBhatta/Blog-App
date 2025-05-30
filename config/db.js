const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Mongodb');
    } catch (error) {
        console.log('Mongo connect error');
    }
};

module.exports = connectDB;
const mongoose = require("mongoose");

const connectToMongodb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Zoo");
        console.log("Connected to MongoDB locally with database 'Zoo'");
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
    }
};

module.exports = connectToMongodb;
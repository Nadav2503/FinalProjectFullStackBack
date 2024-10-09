// Import mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Define an asynchronous function to connect to MongoDB
const connectToMongodb = async () => {
    try {
        // Attempt to connect to the local MongoDB instance with the 'Zoo' database
        await mongoose.connect("mongodb://127.0.0.1:27017/Zoo");

        // Log success message if connection is established
        console.log("Connected to MongoDB locally with database 'Zoo'");
    } catch (error) {
        // Log error message if connection fails
        console.error("Could not connect to MongoDB", error);
    }
};

// Export the connection function so it can be used in other files
module.exports = connectToMongodb;

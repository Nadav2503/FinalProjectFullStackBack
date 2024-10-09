// Import mongoose library to interact with MongoDB
const mongoose = require("mongoose");

require("dotenv").config();// Import configuration

// Connection string for MongoDB Atlas
const connectionStringForMongoDb = process.env.MONGODB_URI;

// Define an asynchronous function to connect to MongoDB
const connectToMongodb = async () => {
    try {
        // Attempt to connect to the local MongoDB instance with the 'Zoo' database
        await mongoose.connect(connectionStringForMongoDb);

        // Log success message if connection is established
        console.log("Connected to MongoDB locally with database 'Zoo'");
    } catch (error) {
        // Log error message if connection fails
        console.error("Could not connect to MongoDB locally", error);
    }
};

// Export the connection function so it can be used in other files
module.exports = connectToMongodb;

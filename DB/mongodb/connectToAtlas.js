const mongoose = require("mongoose"); // Import Mongoose for MongoDB interaction

require("dotenv").config();// Import configuration

// Connection string for MongoDB Atlas
const connectionStringForAtlas = process.env.ATLAS_URI;

// Function to connect to MongoDB Atlas
const connectToAtlasDb = async () => {
    try {
        // Attempt to connect to the database using the connection string
        await mongoose.connect(connectionStringForAtlas);
        console.log("Connected to MongoDB in Atlas with database 'Zoo'"); // Log success message
    } catch (error) {
        console.error("Could not connect to MongoDB in Atlas", error); // Log error if connection fails
    }
};

module.exports = connectToAtlasDb; // Export the connection function

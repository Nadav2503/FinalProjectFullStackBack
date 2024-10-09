const connectToMongodb = require("./mongodb/connectToMongodb"); // Import local MongoDB connection
const connectToAtlasDb = require("./mongodb/connectToAtlas"); // Import MongoDB Atlas connection
const config = require("config"); // Import configuration
const ENVIRONMENT = config.get("ENVIRONMENT"); // Get the current environment setting

// Function to connect to the appropriate database based on the environment
const connectToDb = async () => {
    try {
        // Check if the environment is development or production
        if (ENVIRONMENT === "development") {
            await connectToMongodb(); // Connect to the local MongoDB
        } else if (ENVIRONMENT === "production") {
            await connectToAtlasDb(); // Connect to the MongoDB Atlas
        }
    } catch (error) {
        console.error('Database connection error:', error); // Log any connection errors
    }
};

module.exports = connectToDb; // Export the database connection function

const express = require("express");                  // Import Express framework
require("dotenv").config();                           // Load environment variables from .env file
const connectToMongodb = require("./DB/mongodb/connectToMongodb"); // Import database connection
const morganLogger = require("./middlewares/loggerService"); // Import the custom Morgan logger
const { handleError } = require("./utils/handleErrors"); // Import error handling utilities

const app = express();                                // Initialize Express application
const PORT = process.env.PORT || 8181;               // Set the port to the specified environment variable or default to 8181

// Connect to the MongoDB database
connectToMongodb();

// Use the Morgan logger middleware
app.use(morganLogger);

// Error handling middleware
app.use((err, req, res, next) => {
    // Handle error responses
    handleError(res, err.status || 500, err.message || "Internal Server Error");
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

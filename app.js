const express = require("express"); // Import Express framework
const connectToMongodb = require("./DB/mongodb/connectToMongodb"); // Import database connection
const loggerMiddleware = require("./middlewares/loggerService"); // Import Morgan logger
const { handleError } = require("./middlewares/errorHandler"); // Import error handler
const chalk = require("chalk"); // Import Chalk for colored logging
require("dotenv").config(); // Load environment variables

const app = express(); // Create an Express application
const PORT = process.env.PORT || 8181; // Set the port

app.use(express.json()); // Enable JSON parsing
app.use(loggerMiddleware); // Use the logger middleware

// Centralized error handling middleware
app.use((err, req, res, next) => {
    handleError(res, err.status || 500, err.message); // Handle errors
});

// Start the server and log a message
app.listen(PORT, () => {
    console.log(chalk.green(`Server is listening on port ${PORT}`)); // Log server start message in green
    connectToMongodb(); // Connect to the database
});

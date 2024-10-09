const chalk = require("chalk");                   // Import Chalk for colored error logging

// Function to create a validation error
const createError = (validator, error) => {
    error.message = `${validator} Error: ${error.message}`; // Append validator name to error message
    error.status = error.status || 400;                  // Set default status to 400 if not provided
    throw new Error(error);                               // Throw a new error
};

// Function to handle errors and send response
const handleError = (res, status, message = "") => {
    console.log(chalk.redBright(message));              // Log the error message in red
    return res.status(status).send(message);             // Send the error response with status code
};

// Export the error handling functions
module.exports = { createError, handleError };

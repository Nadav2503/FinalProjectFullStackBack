// Function to create a validation error
const createError = (validator, error) => {
    error.message = `${validator} Error: ${error.message}`; // Append validator name to error message
    error.status = error.status || 400;                  // Set default status to 400 if not provided
    throw new Error(error);                               // Throw a new error
};

// Export the error handling function
module.exports = { createError };

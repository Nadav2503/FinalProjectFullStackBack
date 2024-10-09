const { createError, handleError } = require("../utils/handleErrors"); // Adjust import as necessary
const { verifyToken } = require("./providers/jwt"); // Import the verifyToken function

// Middleware function to authenticate visitors using JWT
const auth = (req, res, next) => {
    try {
        // Get the token from the request header
        const tokenFromClient = req.header("x-auth-token");

        // Check if the token is provided
        if (!tokenFromClient) {
            const error = new Error("Please login."); // Create an error if token is missing
            error.status = 401; // Set status to Unauthorized
            return createError("Authentication", error); // Return error response
        }

        // Verify the token and get visitor information
        const visitorInfo = verifyToken(tokenFromClient);

        // Attach visitor information to the request object for use in subsequent middleware/routes
        req.visitor = visitorInfo;
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        handleError(res, 401, error.message); // Handle unexpected errors
    }
};

// Export the auth middleware for use in other files
module.exports = auth;

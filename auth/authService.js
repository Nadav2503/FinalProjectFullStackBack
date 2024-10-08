const { createError, handleError } = require("../middlewares/errorHandler"); // Import error handling utilities
const { verifyToken } = require("./providers/jwt"); // Import the verifyToken function

const config = require("config");// Import configuration

//token generator type
const tokenGenerator = config.get("TOKEN_GENERATOR");

// Middleware function to authenticate visitors using JWT
const auth = (req, res, next) => {
    // Check if the token generator is set to JWT
    if (tokenGenerator === "TOKEN_GENERATOR") {
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

            // Check if token verification failed
            if (!visitorInfo) {
                const error = new Error("Unauthorized user."); // Create an error for unauthorized access
                error.status = 401; // Set status to Unauthorized
                return createError("Authentication", error); // Return error response
            }

            // Attach visitor information to the request object for use in subsequent middleware/routes
            req.visitor = visitorInfo;
            next(); // Proceed to the next middleware/route handler
        } catch (error) {
            handleError(res, 401, error.message); // Handle unexpected errors
        }
    }
    return handleError(res, 500, "You did not use a valid token generator"); // Handle unexpected errors
};

// Export the auth middleware for use in other files
module.exports = auth;

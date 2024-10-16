const { handleError } = require("../middlewares/errorHandler"); // Import error handling utilities
const { verifyToken } = require("./providers/jwt"); // Import the verifyToken function

const config = require("config"); // Import configuration

// Token generator type
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
                return handleError(res, 401, "Please login."); // Return error if no token is provided
            }

            // Verify the token and get visitor information
            const visitorInfo = verifyToken(tokenFromClient);

            // Check if token verification failed
            if (!visitorInfo) {
                return handleError(res, 401, "Unauthorized user."); // Return error if token verification fails
            }

            // Attach visitor information to the request object for use in subsequent middleware/routes
            req.visitor = visitorInfo;
            next(); // Proceed to the next middleware/route handler
        } catch (error) {
            return handleError(res, 500, error.message); // Handle unexpected errors
        }
    } else {
        return handleError(res, 500, "You did not use a valid token generator"); // Handle unexpected errors
    }
};

// Export the auth middleware for use in other files
module.exports = auth;

const jwt = require("jsonwebtoken");
require("dotenv").config();// Import configuration
// secret word
const SECRET_WORD = process.env.JWT_SECRET;

// Function to generate a JWT token for a visitor
const generateAuthToken = (visitor) => {
    // Create a payload with non-sensitive data
    const payload = {
        id: visitor.id, // Include visitor ID
        isAdmin: visitor.isAdmin, // Include admin status
        membershipTier: visitor.membershipTier, // Membership tier (if applicable)
    };
    // Generate a token with no expiration time
    const token = jwt.sign(payload, SECRET_WORD);
    return token; // Return the generated token
};

// Function to verify the JWT token from the client
const verifyToken = (tokenFromClient) => {
    try {
        // Verify the token and return the payload
        const payload = jwt.verify(tokenFromClient, SECRET_WORD);
        return payload; // Return the payload if valid
    } catch (error) {
        return null; // Return null if token verification fails
    }
};

// Export the functions for use in other files
module.exports = { generateAuthToken, verifyToken };


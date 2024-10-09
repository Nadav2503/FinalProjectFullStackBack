const jwt = require("jsonwebtoken");

// secret word
const SECRET_WORD = "your-secret-key";

// Function to generate a JWT token for a visitor
const generateAuthToken = (visitor) => {
    // Create a payload with non-sensitive data
    const payload = {
        id: visitor.id, // Include visitor ID
        isAdmin: visitor.isAdmin, // Include admin status
        membershipTier: user.membershipTier, // Membership tier (if applicable)
    };
    // Generate a token with no expiration time
    const token = jwt.sign(payload, SECRET_WORD);
    return token; // Return the generated token
};

// Export the function for use in other files
module.exports = { generateAuthToken };


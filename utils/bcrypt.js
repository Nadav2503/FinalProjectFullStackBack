const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing

// Function to hash the visitor's password
const generatVisitorPassword = (password) => bcrypt.hashSync(password, 10); // Hash password with a salt round of 10

// Function to compare the provided password with the hashed password
const comparePasswords = (password, cryptPassword) => {
    return bcrypt.compare(password, cryptPassword); // Return comparison result
};

// Export the functions for use in other files
module.exports = { generatVisitorPassword, comparePasswords };

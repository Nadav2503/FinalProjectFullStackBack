const mongoose = require("mongoose");
const { URL, DEFAULT_VALIDATION } = require("./defaults");

const IMAGE = new mongoose.Schema({
    url: {
        ...URL,          // Spread the URL properties here
        required: false  // Explicitly set required as false
    },
    alt: {
        ...DEFAULT_VALIDATION, // Spread the DEFAULT_VALIDATION properties here
        required: false         // Explicitly set required as false
    }
});

module.exports = IMAGE;

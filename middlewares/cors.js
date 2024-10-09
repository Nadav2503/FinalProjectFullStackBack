const cors = require("cors"); // Import CORS package for Cross-Origin Resource Sharing

// CORS middleware configuration
const corsMiddleWares = cors({
    origin: "*", // Allow all origins 
});

// Export the configured CORS middleware
module.exports = corsMiddleWares;

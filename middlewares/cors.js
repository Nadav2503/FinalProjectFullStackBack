const cors = require("cors"); // Import CORS package for Cross-Origin Resource Sharing

// CORS middleware configuration
const corsMiddleWares = cors({
    origin: ["http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://localhost:3000",
        "http://localhost:5173",], // Allow all origins that the app have
});

// Export the configured CORS middleware
module.exports = corsMiddleWares;

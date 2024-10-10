const Visitor = require("../model/Visitor"); // Import Visitor model
const { createError } = require("../../middlewares/errorHandler"); // Error handling utilities
const config = require("config");
const DB = config.get("DB"); // Database configuration

// Retrieve all visitors - Admin Only
const getAllVisitors = async () => {
    if (DB === "mongodb") {
        try {
            return await Visitor.find(); // Retrieve all visitor records
        } catch (error) {
            return createError("Mongoose", error); // Error handling
        }
    }
    return createError("DB", new Error("Database not configured for this request"));
};

module.exports = {
    getAllVisitors
};
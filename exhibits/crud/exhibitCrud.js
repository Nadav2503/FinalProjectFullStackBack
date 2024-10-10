const Exhibit = require("../model/Exhibit"); // Import Exhibit model
const { createError } = require("../../middlewares/errorHandler"); // Import error handling utilities
const config = require("config");
const DB = config.get("DB"); // Get DB configuration

// Create a new exhibit
const createExhibit = async (newExhibit) => {
    if (DB === "mongodb") {
        try {
            const exhibit = new Exhibit(newExhibit); // Instantiate a new exhibit
            return await exhibit.save(); // Save exhibit to the database
        } catch (error) {
            return createError("Mongoose", error); // Handle any save errors
        }
    }
    return createError("DB", new Error("No other DB configured")); // Return error for unsupported DB
};

module.exports = { createExhibit };
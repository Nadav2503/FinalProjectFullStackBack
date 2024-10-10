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

// Retrieve all exhibits
const getAllExhibits = async () => {
    if (DB === "mongodb") {
        try {
            return await Exhibit.find(); // Fetch all exhibits
        } catch (error) {
            return createError("Mongoose", error); // Handle any fetch errors
        }
    }
    return createError("DB", new Error("No other DB configured")); // Return error for unsupported DB
};

// Retrieve a specific exhibit by ID
const getExhibitById = async (id) => {
    if (DB === "mongodb") {
        try {
            const exhibit = await Exhibit.findById(id); // Fetch exhibit by ID
            if (!exhibit) {
                return createError("Mongoose", new Error("Exhibit not found"), 404); // Handle not found case
            }
            return exhibit; // Return the exhibit
        } catch (error) {
            return createError("Mongoose", error); // Handle any fetch errors
        }
    }
    return createError("DB", new Error("No other DB configured")); // Return error for unsupported DB
};

// Update an exhibit
const updateExhibit = async (id, updatedData) => {
    if (DB === "mongodb") {
        try {
            const exhibit = await Exhibit.findByIdAndUpdate(id, updatedData, { new: true }); // Update and return updated exhibit
            if (!exhibit) {
                return createError("Mongoose", new Error("Exhibit not found"), 404); // Handle not found case
            }
            return exhibit; // Return the updated exhibit
        } catch (error) {
            return createError("Mongoose", error); // Handle any update errors
        }
    }
    return createError("DB", new Error("No other DB configured")); // Return error for unsupported DB
};
module.exports = { createExhibit, getAllExhibits, getExhibitById, updateExhibit };
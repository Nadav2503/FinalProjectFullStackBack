const Review = require("../model/Review"); // Import Review model
const { createError } = require("../../middlewares/errorHandler"); // Error handling utilities

// Create Review
const createReview = async (reviewData) => {
    try {
        const newReview = new Review(reviewData); // Create a new review instance
        return await newReview.save(); // Save the review to the database
    } catch (error) {
        return createError("Mongoose", error); // Handle errors
    }
};

// Exporting all functions
module.exports = {
    createReview,
};
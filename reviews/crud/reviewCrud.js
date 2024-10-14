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

// Update Review
const updateReview = async (id, updatedData) => {
    try {
        const review = await Review.findByIdAndUpdate(id, updatedData, { new: true }); // Update the review and return the updated document
        if (!review) {
            return createError("Mongoose", new Error("Review not found"));
        }
        return review; // Return the updated review
    } catch (error) {
        return createError("Mongoose", error); // Handle errors
    }
};

// Get All Reviews for a Specific Animal or Exhibit
const getReviewsForSpecificAnimalOrExhibit = async (itemId, isExhibit = false) => {
    try {
        const reviews = await Review.find(isExhibit ? { exhibitId: itemId } : { animalId: itemId }); // Fetch reviews based on the item type
        return reviews; // Return the reviews
    } catch (error) {
        return createError("Mongoose", error); // Handle errors
    }
};


// Exporting all functions
module.exports = {
    createReview,
    updateReview,
    getReviewsForSpecificAnimalOrExhibit,
};
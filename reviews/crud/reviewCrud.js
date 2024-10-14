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

// Get Specific Review
const getReviewById = async (id) => {
    try {
        const review = await Review.findById(id); // Fetch review by ID
        if (!review) {
            return createError("Mongoose", new Error("Review not found"));
        }
        return review; // Return the review
    } catch (error) {
        return createError("Mongoose", error); // Handle errors
    }
};

// Delete Review
const deleteReview = async (id) => {
    try {
        const result = await Review.findByIdAndDelete(id); // Delete the review by ID
        if (!result) {
            return createError("Mongoose", new Error("Review not found"));
        }
        return { message: "Review deleted successfully" }; // Success message
    } catch (error) {
        return createError("Mongoose", error); // Handle errors
    }
};

// Like Review
const likeReview = async (reviewId, visitorId) => {
    try {
        const review = await Review.findById(reviewId); // Find the review by ID
        if (!review) {
            return createError("Mongoose", new Error("Review not found"));
        }

        // Check if the visitor already liked the review
        if (!review.likes.includes(visitorId)) {
            review.likes.push(visitorId); // Add visitor ID to likes if not present
        } else {
            review.likes = review.likes.filter(id => id.toString() !== visitorId); // Remove visitor ID if already liked
        }

        await review.save(); // Save changes
        return review; // Return updated review
    } catch (error) {
        return createError("Mongoose", error); // Handle errors
    }
};

// Exporting all functions
module.exports = {
    createReview,
    updateReview,
    getReviewsForSpecificAnimalOrExhibit,
    getReviewById,
    deleteReview,
    likeReview,
};
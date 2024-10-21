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

// Get All Reviews for a Specific Animal
const getReviewsForAnimal = async (animalId) => {
    try {
        const reviews = await Review.find({ animalId }); // Fetch reviews for the specific animal
        return reviews; // Return the reviews
    } catch (error) {
        return createError("Mongoose", error); // Handle errors
    }
};

// Get All Reviews for a Specific Exhibit
const getReviewsForExhibit = async (exhibitId) => {
    try {
        const reviews = await Review.find({ exhibitId }); // Fetch reviews for the specific exhibit
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

// Get All Reviews by a Specific Visitor
const getReviewsByVisitor = async (visitorId) => {
    try {
        const reviews = await Review.find({ visitorId }); // Fetch reviews by the visitor
        return reviews; // Return the reviews
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
            review.likes = review.likes.filter(id => id.toString() !== visitorId.toString()); // Remove visitor ID if already liked
        }

        await review.save(); // Save changes
        return review; // Return updated review
    } catch (error) {
        return createError("Mongoose", error); // Handle errors
    }
};

// Calculate Average Rating for a Specific Animal
const calculateAverageRatingForAnimal = async (animalId) => {
    try {
        const reviews = await Review.find({ animalId });
        if (reviews.length === 0) return 0; // Return 0 if no reviews

        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return totalRating / reviews.length; // Return average rating
    } catch (error) {
        return createError("Mongoose", error); // Handle errors
    }
};

// Calculate Average Rating for a Specific Exhibit
const calculateAverageRatingForExhibit = async (exhibitId) => {
    try {
        const reviews = await Review.find({ exhibitId });
        if (reviews.length === 0) return 0; // Return 0 if no reviews

        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return totalRating / reviews.length; // Return average rating
    } catch (error) {
        return createError("Mongoose", error); // Handle errors
    }
};

// Exporting all functions
module.exports = {
    createReview,
    updateReview,
    getReviewsForAnimal,
    getReviewsForExhibit,
    getReviewsByVisitor,
    getReviewById,
    deleteReview,
    likeReview,
    calculateAverageRatingForAnimal,
    calculateAverageRatingForExhibit
};
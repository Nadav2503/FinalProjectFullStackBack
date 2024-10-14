const express = require("express");
const { handleError } = require("../../middlewares/errorHandler");
const auth = require("../../auth/authService");
const {
    getReviewsForAnimal,
    calculateAverageRatingForAnimal,
} = require("../crud/reviewCrud");
const router = express.Router();

// GET Zoo/reviews/animal/:animalId - Get all reviews for a specific animal
router.get("/animal/:animalId", auth, async (req, res) => {
    try {
        const reviews = await getReviewsForAnimal(req.params.animalId); // Fetch reviews
        const averageRating = await calculateAverageRatingForAnimal(req.params.animalId); // Calculate average rating
        res.status(200).send({ reviews, averageRating }); // Return reviews and average rating
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});



// Export the router for use in other modules
module.exports = router;

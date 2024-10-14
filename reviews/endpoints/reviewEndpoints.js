const express = require("express");
const { handleError } = require("../../middlewares/errorHandler");
const auth = require("../../auth/authService");
const {
    createReview,
    getReviewsForAnimal,
    getReviewsForExhibit,
    calculateAverageRatingForAnimal,
    calculateAverageRatingForExhibit,
    updateReview,
} = require("../crud/reviewCrud");
const { normalizeReview } = require("../../utils/normalizing/normalizeReview");
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

// GET Zoo/reviews/exhibit/:exhibitId - Get all reviews for a specific exhibit
router.get("/exhibit/:exhibitId", auth, async (req, res) => {
    try {
        const reviews = await getReviewsForExhibit(req.params.exhibitId); // Fetch reviews
        const averageRating = await calculateAverageRatingForExhibit(req.params.exhibitId); // Calculate average rating
        res.status(200).send({ reviews, averageRating }); // Return reviews and average rating
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// POST Zoo/reviews - Create a new review
router.post("/", auth, async (req, res) => {
    try {
        const { isAdmin, membershipTier } = req.visitor;

        // Check if the user is allowed to create a review
        if (!isAdmin && membershipTier !== "Tier 3 - Jungle King/Queen" && membershipTier !== "Tier 4 - Safari Leader") {
            return handleError(res, 403, "You are not allowed to create a review.");
        }

        // Normalize the incoming review data
        const normalizedReview = normalizeReview(req.body);

        const review = await createReview(normalizedReview); // Create review with normalized data
        res.status(201).send(review); // Return created review
    } catch (error) {
        handleError(res, error.status || 400, error.message); // Handle validation errors
    }
});

// PUT Zoo/reviews/:id - Update a specific review
router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { _id: visitorId } = req.visitor;

        const review = await getReviewById(id); // Fetch review by ID

        // Check if the user is the owner of the review or an admin
        if (review.visitorId.toString() !== visitorId.toString() && !req.visitor.isAdmin) {
            return handleError(res, 403, "You are not authorized to update this review.");
        }

        // Normalize the incoming review data
        const normalizedReview = normalizeReview({ ...req.body, date: req.body.date });

        const updatedReview = await updateReview(id, normalizedReview); // Update review with normalized data
        res.send(updatedReview); // Return updated review
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});


// Export the router for use in other modules
module.exports = router;

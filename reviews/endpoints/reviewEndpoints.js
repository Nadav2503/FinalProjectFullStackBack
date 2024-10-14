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
    deleteReview,
    getReviewById,
    likeReview,
} = require("../crud/reviewCrud");
const { normalizeReview } = require("../../utils/normalizing/normalizeReview");
const { validateCreateReview, validateUpdateReview } = require("../validation/reviewValidationService");
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

// GET Zoo/reviews/:id - Get a specific review by ID
router.get("/:id", auth, async (req, res) => {
    try {
        const review = await getReviewById(req.params.id); // Fetch review by ID
        res.status(200).send(review); // Return review
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// GET Zoo/reviews/visitor/:visitorId - Get all reviews by a specific visitor
router.get("/visitor/:visitorId", auth, async (req, res) => {
    try {
        const { visitorId } = req.params;
        const { _id: currentVisitorId, isAdmin } = req.visitor;

        // Allow only the visitor or admin to see their reviews
        if (visitorId !== currentVisitorId.toString() && !isAdmin) {
            return handleError(res, 403, "You are not authorized to view these reviews.");
        }

        const reviews = await getReviewsByVisitor(visitorId); // Fetch reviews by visitor
        res.status(200).send(reviews); // Return reviews
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

        const { error } = validateCreateReview(req.body); // Validate incoming review data
        if (error) return res.status(400).send(error.details[0].message); // Return validation error if any

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

        const { error } = validateUpdateReview(req.body); // Validate update review data
        if (error) return res.status(400).send(error.details[0].message); // Return validation error if any

        // Normalize the incoming review data
        const normalizedReview = normalizeReview({ ...req.body, date: req.body.date });

        const updatedReview = await updateReview(id, normalizedReview); // Update review with normalized data
        res.send(updatedReview); // Return updated review
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// DELETE Zoo/reviews/:id - Delete a specific review
router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { _id: visitorId } = req.visitor;

        const review = await getReviewById(id); // Fetch review by ID

        // Check if the user is the owner of the review or an admin
        if (review.visitorId.toString() !== visitorId.toString() && !req.visitor.isAdmin) {
            return handleError(res, 403, "You are not authorized to delete this review.");
        }

        const result = await deleteReview(id); // Delete review
        res.send(result); // Return success message
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// PATCH Zoo/reviews/:id/like - Like or unlike a review
router.patch("/:id/like", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const visitorId = req.visitor._id; // Get the ID of the visitor liking the review
        const updatedReview = await likeReview(id, visitorId); // Like or unlike the review
        res.send(updatedReview); // Return updated review
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// Export the router for use in other modules
module.exports = router;

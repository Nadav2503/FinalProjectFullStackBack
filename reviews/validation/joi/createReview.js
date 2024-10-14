const Joi = require('joi');

// Validation schema for creating a review
const createReviewValidate = (review) => {
    const createReviewSchema = Joi.object({
        visitorId: Joi.string().required(), // This should always be required as it's the ID of the visitor creating the review
        exhibitId: Joi.string().optional(), // Optional reference to the Exhibit
        animalId: Joi.string().optional(),   // Optional reference to the Animal
        rating: Joi.number().min(1).max(5).required(), // Rating must be between 1 and 5
        comment: Joi.string().trim().min(1).max(256).required(), // Comment is required and must not be empty
    });

    return createReviewSchema.validate(review);
};

module.exports = { createReviewValidate };

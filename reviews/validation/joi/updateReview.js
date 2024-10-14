const Joi = require('joi');

// Validation for updating a review
const updateReviewValidate = (review) => {
    const updateSchema = Joi.object({
        rating: Joi.number().min(1).max(5).optional(),  // Optional rating update with min 1
        comment: Joi.string().trim().max(256).optional(), // Optional comment update
    }).min(1); // Requires at least one field to be present for update

    return updateSchema.validate(review);
};

module.exports = { updateReviewValidate };

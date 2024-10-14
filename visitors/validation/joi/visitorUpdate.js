const Joi = require('joi');

// Validation function for updating visitor details
const visitorUpdateValidate = (updateData) => {
    const updateVisitorSchema = Joi.object({
        name: Joi.object({
            first: Joi.string().min(2).max(256).optional(),
            middle: Joi.string().optional(),
            last: Joi.string().min(2).max(256).optional(),
        }).optional(),
        phone: Joi.string().optional().pattern(/^\+?[0-9]{10,15}$/),
        image: Joi.object({
            url: Joi.string().uri().optional(),
            alt: Joi.string().max(256).optional(),
        }).optional(),
    }).min(1); // Requires at least one field to be present for update

    return updateVisitorSchema.validate(updateData);
};

module.exports = { visitorUpdateValidate };

const Joi = require('joi');

// Function to validate exhibit updates
const validateExhibitUpdate = (exhibit) => {
    const updateExhibitSchema = Joi.object({
        name: Joi.string().max(256).optional().unique(),
        description: Joi.string().max(500).optional(),
        location: Joi.string().valid('Africa', 'Asia', 'Europe', 'North America', 'South America', 'Australia', 'Antarctica').optional(),
        status: Joi.string().valid('open', 'closed', 'under maintenance').optional(),
    }).min(1); // Requires at least one field

    return updateExhibitSchema.validate(exhibit);
};

module.exports = validateExhibitUpdate;

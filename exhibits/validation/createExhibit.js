const Joi = require('joi');

// Function to validate exhibit creation
const validateExhibitCreation = (exhibit) => {
    const createExhibitSchema = Joi.object({
        name: Joi.string().max(256).required().unique(),
        description: Joi.string().max(500).required(),
        location: Joi.string().valid('Africa', 'Asia', 'Europe', 'North America', 'South America', 'Australia', 'Antarctica').required(),
        animals: Joi.array().items(Joi.string()).optional(), // Array of animal IDs, optional
        capacity: Joi.number().min(0).max(100).required(), // Admin sets capacity between 0 and 100
        status: Joi.string().valid('open', 'closed', 'under maintenance').default('open'), // Valid status options
    });

    return createExhibitSchema.validate(exhibit);
};

module.exports = { validateExhibitCreation };

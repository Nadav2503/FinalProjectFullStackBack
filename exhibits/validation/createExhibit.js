const Joi = require('joi');

// Function to validate exhibit creation
const validateExhibitCreation = (exhibit) => {
    // Define the schema for creating an exhibit
    const createExhibitSchema = Joi.object({
        name: Joi.string().required().max(256).unique(), // Exhibit name, required and unique
        description: Joi.string().required().max(500), // Exhibit description, required
        location: Joi.string()
            .valid('Africa', 'Asia', 'Europe', 'North America', 'South America', 'Australia') // Limited locations
            .required(), // Location is required
        status: Joi.string()
            .valid('open', 'closed', 'under maintenance') // Valid status options
            .default('open') // Default value if not provided
            .required(), // Status is required
        capacity: Joi.number().min(0).max(100).required(), // Maximum capacity must be set
    });

    // Validate the exhibit against the schema
    return createExhibitSchema.validate(exhibit);
};

module.exports = validateExhibitCreation;

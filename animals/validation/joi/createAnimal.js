const Joi = require("joi");

// Validation function for creating an animal
const animalCreationValidate = (animal) => {
    const createAnimalSchema = Joi.object({
        name: Joi.string().min(2).max(256).required(),
        type: Joi.string().min(2).max(256).required(),
        gender: Joi.string().valid("male", "female").required(),
        age: Joi.number().integer().min(1).required(), // Ensures age is a positive integer
        description: Joi.string().min(2).max(256).required(),
        diet: Joi.string().valid("omnivore", "carnivore", "herbivore").required(),
        isEndangered: Joi.boolean().required(),
        healthStatus: Joi.string().min(2).max(256).required(),
        image: Joi.object({
            url: Joi.string().uri().required(),
            alt: Joi.string().min(2).max(256).required(),
        }).required(),
    });

    return createAnimalSchema.validate(animal);
};

module.exports = { animalCreationValidate };

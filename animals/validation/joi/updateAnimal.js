const Joi = require("joi");

// Validation function for updating an animal
const animalUpdateValidate = (animal) => {
    const updateAnimalSchema = Joi.object({
        name: Joi.string().min(2).max(256),
        gender: Joi.string().valid("male", "female"),
        age: Joi.number().integer().min(1),
        description: Joi.string().min(2).max(256),
        diet: Joi.string().valid("omnivore", "carnivore", "herbivore"),
        healthStatus: Joi.string().min(2).max(256),
        image: Joi.object({
            url: Joi.string().uri(),
            alt: Joi.string().min(2).max(256),
        }),
    }).min(1); // Ensures at least one field is provided for update
    return updateAnimalSchema.validate(animal);
};

module.exports = { animalUpdateValidate };
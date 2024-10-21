const Joi = require('joi');

// Function to validate adding/removing animals from an exhibit
const exhibitAnimalsUpdateValidate = (animals) => {
    const animalUpdateSchema = Joi.object({
        addAnimals: Joi.array().items(Joi.string()).optional(), // Array of animal IDs to add
        removeAnimals: Joi.array().items(Joi.string()).optional(), // Array of animal IDs to remove
    }).xor('addAnimals', 'removeAnimals'); // At least one of these fields must be present

    return animalUpdateSchema.validate(animals);
};

module.exports = { exhibitAnimalsUpdateValidate };
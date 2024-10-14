const { animalCreationValidate } = require("./joi/createAnimal");
const { animalUpdateValidate } = require("./joi/updateAnimal");

const config = require("config");
const validator = config.get("VALIDATOR");

const validateAnimalCreation = (animal) => {
    if (validator === "Joi") {
        const { error } = animalCreationValidate(animal);
        if (error) return error.details[0].message;
        return "";
    }
};

const validateAnimalUpdate = (animal) => {
    if (validator === "Joi") {
        const { error } = animalUpdateValidate(animal);
        if (error) return error.details[0].message;
        return "";
    }
};

module.exports = { validateAnimalCreation, validateAnimalUpdate }

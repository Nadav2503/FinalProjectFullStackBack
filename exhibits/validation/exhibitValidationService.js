const { exhibitCreationValidate } = require("./joi/createExhibit");
const { exhibitUpdateValidate } = require("./joi/updateExhibit");
const { exhibitAnimalsUpdateValidate } = require("./joi/updateAnimalsExhibit");
const config = require("config");
const validator = config.get("VALIDATOR");

const validateExhibitCreation = (animal) => {
    if (validator === "Joi") {
        const { error } = exhibitCreationValidate(animal);
        if (error) return error.details[0].message;
        return "";
    }
};

const validateExhibitUpdate = (animal) => {
    if (validator === "Joi") {
        const { error } = exhibitUpdateValidate(animal);
        if (error) return error.details[0].message;
        return "";
    }
};

const validateExhibitAnimalsUpdate = (animal) => {
    if (validator === "Joi") {
        const { error } = exhibitAnimalsUpdateValidate(animal);
        if (error) return error.details[0].message;
        return "";
    }
};
module.exports = { validateExhibitCreation, validateExhibitUpdate, validateExhibitAnimalsUpdate }

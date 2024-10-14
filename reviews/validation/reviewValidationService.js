const { createReviewValidate } = require("./joi/createReview");
const { updateReviewValidate } = require("./joi/updateReview");
const config = require("config");
const validator = config.get("VALIDATOR");

const validateCreateReview = (animal) => {
    if (validator === "Joi") {
        const { error } = createReviewValidate(animal);
        if (error) return error.details[0].message;
        return "";
    }
};

const validateUpdateReview = (animal) => {
    if (validator === "Joi") {
        const { error } = updateReviewValidate(animal);
        if (error) return error.details[0].message;
        return "";
    }
};

module.exports = { validateCreateReview, validateUpdateReview }

const { loginValidate } = require("./joi/visitorLogin");
const { registerValidate } = require("./joi/visitorRegister");
const { visitorUpdateValidate } = require("./joi/visitorUpdate");
const config = require("config");
const validator = config.get("VALIDATOR");

const validateLogin = (animal) => {
    if (validator === "Joi") {
        const { error } = loginValidate(animal);
        if (error) return error.details[0].message;
        return "";
    }
};

const validateRegister = (animal) => {
    if (validator === "Joi") {
        const { error } = registerValidate(animal);
        if (error) return error.details[0].message;
        return "";
    }
};

const validateUpdateVisitor = (animal) => {
    if (validator === "Joi") {
        const { error } = visitorUpdateValidate(animal);
        if (error) return error.details[0].message;
        return "";
    }
};

module.exports = { validateLogin, validateRegister, validateUpdateVisitor }

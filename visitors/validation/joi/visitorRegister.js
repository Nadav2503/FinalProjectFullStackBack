const Joi = require('joi');

const registerValidate = (visitor) => {
    const registerSchema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        name: Joi.object({
            first: Joi.string().required().max(256),
            middle: Joi.string().optional().max(256),
            last: Joi.string().required().max(256),
        }).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')).required(), // At least 8 character with 1 big letter and 1 number
        membershipTier: Joi.string().valid('Explorer', 'Lionheart', 'Jungle King/Queen', 'Safari Leader').default('Explorer'),
        phone: Joi.string().pattern(/^(?:\+972-?5\d{2}-?\d{4}|(?:\+972|0)?50-?\d{7})$/).optional(), // Updated to accept Israeli formats
    });

    return registerSchema.validate(visitor);
};

module.exports = { registerValidate };

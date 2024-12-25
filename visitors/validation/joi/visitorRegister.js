const Joi = require('joi');

const passwordPattern = new RegExp(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/
);

const registerValidate = (visitor) => {
    const registerSchema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        name: Joi.object({
            first: Joi.string().required().max(256),
            middle: Joi.string().optional().max(256),
            last: Joi.string().required().max(256),
        }).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(passwordPattern).required(), // At least 8 character with 1 big letter and 1 number
        membershipTier: Joi.string().valid('Explorer', 'Lionheart', 'Jungle King/Queen', 'Safari Leader').default('Explorer'),
        phone: Joi.string().pattern(/^(?:\+972-?5\d-?\d{7}|0?5\d-?\d{7})$/).optional(), // Updated to accept Israeli formats
        image: Joi.object({
            url: Joi.string().uri().optional(),
            alt: Joi.string().max(256).optional(),
        }).optional(),
    });

    return registerSchema.validate(visitor);
};

module.exports = { registerValidate };

const Joi = require('joi');

const validateRegister = (visitor) => {
    const registerSchema = Joi.object({
        username: Joi.string().min(3).max(30).required().unique(),
        name: Joi.object({
            first: Joi.string().required().max(256),
            middle: Joi.string().optional().max(256),
            last: Joi.string().required().max(256),
        }).required(),
        email: Joi.string().email().required().unique(),
        password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')).required(), // At least 8 characters, 1 letter and 1 number
        membershipTier: Joi.string().valid('Explorer', 'Lionheart', 'Jungle King/Queen', 'Safari Leader').default('Explorer'),
    });

    return registerSchema.validate(visitor);
};

module.exports = { validateRegister };
const Joi = require('joi');

const msg = 'Invalid entries. Try again.';

const schema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'string.empty': msg, 'any.required': msg,
        }),

    password: Joi.string()
        .required()
        .messages({
            'string.empty': msg, 'any.required': msg,
        }),

    email: Joi.string()
        .required()
        .messages({
            'string.empty': msg, 'any.required': msg,
        }),
});

const userValidation = (req, res, next) => {
    try {
        const { name, password, email } = req.body;
        
        const validation = schema.validate({ name, password, email });

        if (validation.error) return validation;

        return true;
    } catch (error) {
        next(error);
    }
};

module.exports = userValidation;
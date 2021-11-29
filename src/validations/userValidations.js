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

const userValidation = (name, password, email) => {
        const validation = schema.validate({ name, password, email });

        if (validation.value) {
            return validation;
        }

        return true;
};

module.exports = userValidation;
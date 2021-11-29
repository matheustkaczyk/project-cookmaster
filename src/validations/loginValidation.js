const Joi = require('joi');

const msg = 'All fields must be filled';

const schema = Joi.object({

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': msg, 'any.required': msg, 'string.email': msg,
        }),

    password: Joi.string()
        .required()
        .messages({
            'string.empty': msg, 'any.required': msg,
        }),

});

const loginValidation = (email, password) => {
        const validation = schema.validate({ email, password });

        if (validation.value) {
            return validation;
        }

        return true;
};

module.exports = loginValidation;
const Joi = require('joi');

const msg = 'Invalid entries. Try again.';

const schema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'any.required': msg,
        }),

    ingredients: Joi.string()
        .required()
        .messages({
            'any.required': msg,
        }),

    preparation: Joi.string()
        .required()
        .messages({
            'any.required': msg,
        }),
});

const recipesValidation = (name, ingredients, preparation) => {
        const validation = schema.validate({ name, ingredients, preparation });

        if (validation.error) {
            return ({ code: 400, ...validation });
        }

        return true;
};

module.exports = recipesValidation;
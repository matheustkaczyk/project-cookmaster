const userValidation = require('../validations/userValidations');
const userModel = require('../models/usersModel');

const create = async (name, password, email) => {
    const validation = userValidation(name, password, email);
    const emailValidation = await userModel.findByEmail(email);

    if (validation.error) return ({ code: 400, ...validation });
    if (emailValidation.length > 0) {
    return (
        { code: 409, error: { message: 'Email already registered' } }); 
}

    return userModel.create(name, password, email);
};

module.exports = { create };

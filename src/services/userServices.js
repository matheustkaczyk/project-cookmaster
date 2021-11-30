const userValidation = require('../validations/userValidations');
const loginValidation = require('../validations/loginValidation');
const recipesValidation = require('../validations/recipesValidation');
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

const login = async (email, password) => {
    const validation = loginValidation(email, password);
    const emailValidation = await userModel.findByEmail(email);

    if (validation.error) return ({ code: 401, ...validation });
    if (emailValidation.length <= 0 || emailValidation[0].password !== password) {
    return (
        { code: 401, error: { message: 'Incorrect username or password' } }); 
    }

    return emailValidation;
};

const recipes = async (name, ingredients, preparation, id) => {
    const validation = recipesValidation(name, ingredients, preparation);

    if (validation.error) return validation;

    const data = await userModel.recipes(name, ingredients, preparation, id);
    return data;
};

const getRecipes = async () => {
    const data = await userModel.getRecipes();

    if (data.length <= 0) return ({ code: 400, error: { message: 'No recipes found' } });

    return data;
};

module.exports = { create, login, recipes, getRecipes };

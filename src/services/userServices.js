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

const getRecipesById = async (id) => {
    try {
        const data = await userModel.getRecipesById(id);
    
        if (data.length <= 0) return ({ code: 404, error: { message: 'recipe not found' } });
    
        return data;
    } catch (error) {
        return ({ code: 404, error: { message: 'recipe not found' } });
    }
};

const updateRecipeById = async (id, body, user) => {
    const { name, ingredients, preparation } = body;
    const { _id } = user;

    const recipe = await userModel.getRecipesById(id);
    const { userId } = recipe[0];

    if (userId === _id || user.role === 'admin') {
        const data = await userModel.updateRecipeById(id, name, ingredients, preparation);
        if (data.modifiedCount > 0) {
            return ({ _id: id, ...body, userId });
        }
    }

    return (
        { code: 404, error: { message: 'missing auth token' } }
    );
};

const deleteRecipeById = async (id, user) => {
    const recipe = await userModel.getRecipesById(id);
    const { role, userId } = recipe[0];
    const { _id } = user;

    if (userId === _id || role === 'admin') {
        return userModel.deleteRecipeById(id);
    }

    return ({ code: 401 });
};

const updateRecipe = async (id, user) => {
    const recipe = await userModel.getRecipesById(id);
    const { id: userId, role } = user;

    const newRecipe = {
        ...recipe[0],
        image: `localhost:3000/src/uploads/${id}.jpeg`,
    };

    if (userId === recipe.userId || role === 'admin') {
        await userModel.updateRecipe(id, newRecipe);
    }

    return newRecipe;
};

module.exports = {
    create,
    login,
    recipes,
    getRecipes,
    getRecipesById,
    updateRecipeById,
    deleteRecipeById,
    updateRecipe,
};

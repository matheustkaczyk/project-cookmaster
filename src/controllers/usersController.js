const jwt = require('jsonwebtoken');
const userServices = require('../services/userServices');

const secret = 'secreto';

const jwtConfig = {
    expiresIn: '7d',
};

const create = async (req, res) => {
    const { name, password, email } = req.body;

    const data = await userServices.create(name, password, email);

    if (data.error) return res.status(data.code).json({ message: data.error.message });

    res.status(201).json(data);
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const data = await userServices.login(email, password);

    if (data.error) return res.status(data.code).json({ message: data.error.message });

    const tokenKey = jwt.sign({ data: data[0] }, secret, jwtConfig);

    res.status(200).json({ token: tokenKey });
};

const recipes = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id: id } = req.user;

    const data = await userServices.recipes(name, ingredients, preparation, id);

    if (data.error) return res.status(data.code).json({ message: data.error.message });

    res.status(201).json(data);
};

const getRecipes = async (_req, res) => {
    const data = await userServices.getRecipes();

    if (data.error) return res.status(data.code).json({ message: data.error.message });

    res.status(200).json(data);
};

const getRecipesById = async (req, res) => {
    const { id } = req.params;

    const data = await userServices.getRecipesById(id);

    if (data.error) return res.status(data.code).json({ message: data.error.message });

    res.status(200).json(data[0]);
};

module.exports = { create, login, recipes, getRecipes, getRecipesById };

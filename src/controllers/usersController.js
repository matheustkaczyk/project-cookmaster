const jwt = require('jsonwebtoken');
const userServices = require('../services/userServices');

const secret = 'secreto';

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
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

    const tokenKey = jwt.sign({ data }, secret, jwtConfig);

    res.status(200).json({ token: tokenKey });
};

module.exports = { create, login };

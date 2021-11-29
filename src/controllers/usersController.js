const userServices = require('../services/userServices');

const create = async (req, res) => {
    const { name, email, password } = req.body;

    const data = await userServices(name, email, password);

    res.status(200).json(data);
};

module.exports = { create };
const userServices = require('../services/userServices');

const create = async (req, res) => {
    const { name, password, email } = req.body;

    const data = await userServices.create(name, password, email);

    if (data.error) return res.status(400).json({ message: data.error.message });

    if (data.err) return res.status(409).json({ message: data.error.messsage });

    res.status(201).json(data);
};

module.exports = { create };
const userValidation = require('../validations/userValidations');

const create = (name, password, email) => {
    const validation = userValidation(name, password, email);

    
};

module.exports = { create };

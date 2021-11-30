const express = require('express');
const usersController = require('./usersController');

const jwtValidation = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/users', usersController.create);
router.post('/login', usersController.login);
router.post('/recipes', jwtValidation, usersController.recipes);

module.exports = router;

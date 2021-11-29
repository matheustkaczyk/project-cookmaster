const express = require('express');
const usersController = require('./usersController');

const router = express.Router();

router.post('/users', usersController.create);
router.post('/login', usersController.login);

module.exports = router;

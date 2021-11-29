const express = require('express');
const usersController = require('./usersController');

const router = express.Router();

router.post('/', usersController.create);

module.exports = router;

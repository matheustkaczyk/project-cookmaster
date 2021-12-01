const express = require('express');

const usersController = require('./usersController');

const jwtValidation = require('../middlewares/validateJWT');
const uploadMiddleware = require('../middlewares/upload');

const router = express.Router();

router.post('/users', usersController.create);

router.post('/login', usersController.login);

router.put(
    '/recipes/:id/image',
    jwtValidation,
    uploadMiddleware,
    usersController.updateRecipe,
);
router.delete('/recipes/:id', jwtValidation, usersController.deleteRecipeById);
router.get('/recipes/:id', usersController.getRecipesById);
router.put('/recipes/:id', jwtValidation, usersController.updateRecipeById);
router.post('/recipes', jwtValidation, usersController.recipes);
router.get('/recipes', usersController.getRecipes);

module.exports = router;

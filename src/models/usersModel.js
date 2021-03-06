const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const create = (name, password, email) => getConnection()
    .then((db) => db.collection('users').insertOne({ name, password, email, role: 'user' }))
    .then((result) => ({ user: { name, email, role: 'user', _id: result.insertedId } }));

const findByEmail = async (email) => getConnection()
    .then((db) => db.collection('users').find({ email }).toArray())
    .then((result) => result);

const recipes = async (name, ingredients, preparation, id) => getConnection()
    .then((db) => db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId: id }))
    .then((result) => (
        { 
            recipe: { 
            name,
            ingredients,
            preparation,
            userId: ObjectId(id),
            _id: ObjectId(result.insertedId),
            },
        }
    ));

const getRecipes = async () => getConnection()
    .then((db) => db.collection('recipes').find({}).toArray())
    .then((result) => result);

const getRecipesById = async (id) => getConnection()
        .then((db) => db.collection('recipes').find({ _id: ObjectId(id) }).toArray())
        .then((result) => result);

const updateRecipeById = async (id, name, ingredients, preparation) => getConnection()
    .then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }))
    .then((result) => result);

const deleteRecipeById = async (id) => getConnection()
        .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

const updateRecipe = (id, { name, ingredients, preparation, userId, image }) => getConnection()
        .then((db) => db.collection('recipes').updateOne(
            { _id: ObjectId(id) }, { $set: {
                name,
                ingredients,
                preparation,
                userId,
                image } },
            ));

module.exports = {
    create,
    findByEmail,
    recipes,
    getRecipes,
    getRecipesById,
    updateRecipeById,
    deleteRecipeById,
    updateRecipe,
};
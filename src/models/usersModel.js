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

module.exports = { create, findByEmail, recipes, getRecipes, getRecipesById };
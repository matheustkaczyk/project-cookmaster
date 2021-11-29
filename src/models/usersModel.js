const { getConnection } = require('./connection');

const create = (name, password, email) => getConnection()
    .then((db) => db.collection('users').insertOne({ name, password, email, role: 'user' }))
    .then((result) => ({ user: { name, email, role: 'user', _id: result.insertedId } }));

const findByEmail = async (email) => getConnection()
    .then((db) => db.collection('users').find({ email }).toArray())
    .then((result) => result);

module.exports = { create, findByEmail };
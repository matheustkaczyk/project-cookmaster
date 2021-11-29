const getConnection = require('./connection');

const create = () => {

};

const findByEmail = async (email) => getConnection()
.then((db) => db.collection('users').findOne({ email }).toArray())
.then((result) => result);

module.exports = { create, findByEmail };
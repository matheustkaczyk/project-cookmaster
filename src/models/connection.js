const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/Cookmaster`;
const DB_NAME = 'Cookmaster';

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connection = null;

const getConnection = () => (connection
    ? Promise.resolve(connection)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
        .then((conn) => {
            db = conn.db(DB_NAME);
            return db;
        })
);

module.exports = { getConnection };

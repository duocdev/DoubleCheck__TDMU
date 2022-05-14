const MongoClient = require('mongodb').MongoClient;


// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'DoubleCheck';

let db = null;

const connect = async () => {
    const client = await MongoClient.connect(url);
    db = client.db(dbName);
    console.log('Connected to MongoDB');
};

const getDB = () => {
    return db;
}

module.exports = { connect, getDB };
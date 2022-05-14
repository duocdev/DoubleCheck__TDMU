const { getDB } = require('./db');

const log = async (log) => {
    const db = await getDB();
    await db.collection('logs').insertOne(log);
    console.log(log);
}


module.exports = { log };
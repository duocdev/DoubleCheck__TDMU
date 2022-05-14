const { getDB } = require('./db');
const { log } = require('./logger');

const crypto = require('crypto');

const adminCreator = async (username, password, name) => {

    const db = await getDB();

    let admin = await db.collection('accounts').findOne({ username: username });

    if (admin === null) {

        let salt = crypto.randomBytes(16).toString('hex');
        let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

        let newAdmin = {
            username: username,
            password: hash,
            salt: salt,
            name: name,
            role: 'Admin'
        }

        await db.collection('accounts').insertOne(newAdmin);
        log({ type: 'Tạo tài khoản Admin', status: 'Thành công', data: { username: username, name: name, role: 'Admin' } });
        return true;

    }
}

module.exports = { adminCreator };
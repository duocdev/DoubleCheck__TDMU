
const { getDB } = require('../bin/db');
const { log } = require('../bin/logger');

const crypto = require('crypto');
const router = require('express').Router();



router.get('/admin/dashboard', async (req, res) => {
    if (req.session.account) {
        res.render('admin/dashboard', { account: req.session.account });
    } else {
        res.redirect('/admin/login');
    }
})

router.get('/admin/login', async (req, res) => {
    res.render('admin/login');
})


router.get('/admin/logout', async(req,res)=>{
    req.session.destroy();
    res.redirect('/admin/login');
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// * check login
router.post('/admin/login', async (req, res) => {

    const { username, password } = req.body;

    let db = await getDB();

    let account = await db.collection('accounts').findOne({ username: username });

    if (account === null) {
        return res.json({ status: false, message: 'Tài khoản không tồn tại' });
    }

    let hash = crypto.pbkdf2Sync(password, account.salt, 1000, 64, 'sha512').toString('hex');

    if (hash !== account.password) {
        return res.json({ status: false, message: 'Mật khẩu không đúng' });
    }

    req.session.account = account;

    log({ type: 'Đăng nhập', status: 'Thành công', data: { username: username, name: account.name, role: account.role } });

    res.json({ status: true });

})

// * update account






module.exports = router;
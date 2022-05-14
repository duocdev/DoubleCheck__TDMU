
const { getDB } = require('../bin/db');
const { log } = require('../bin/logger');

const OjectID = require('mongodb').ObjectId;

const router = require('express').Router();


router.get('/tra-cuu/:productID', async (req, res) => {

    const { productID } = req.params;

    let db = await getDB();

    let product = await db.collection('products').findOne({ productID });

    if (product === null) {
        return res.send('ID sản phẩm không chính xác. Vui lòng kiểm tra lại.');
    }

    let transactions = await db.collection('transactions').find({ productID }).toArray();


    res.render('tra-cuu', { product, transactions });

})


router.get('/tra-cuu', async (req, res) => {

    res.redirect('/admin/login');
})

router.get('/', async (req, res) => {

    res.redirect('/admin/login');
})

router.get('/tra-cuu/giao-dich/:id', async (req, res) => {

    const { id } = req.params;

    let db = await getDB();

    let transaction = await db.collection('transactions').findOne({ _id: OjectID(id) });

    if (transaction === null) {
        return res.send('ID giao dịch không chính xác. Vui lòng kiểm tra lại.');
    }

    let product = await db.collection('products').findOne({ productID: transaction.productID });

    res.render('transaction-view', { transaction, product });

})





module.exports = router;
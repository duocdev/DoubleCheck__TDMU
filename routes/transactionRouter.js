
const { getDB } = require('../bin/db');
const { log } = require('../bin/logger');

const OjectID = require('mongodb').ObjectId;
const router = require('express').Router();


router.get('/admin/transaction-create', async (req, res) => {

    if (req.session.account === undefined) {
        return res.redirect('/admin/login');
    }

    res.render('admin/transaction-create', { account: req.session.account });

})



router.get('/admin/transaction-list', async (req, res) => {

    if (req.session.account === undefined) {
        return res.redirect('/admin/login');
    }

    let db = await getDB();

    let transactions = await db.collection('transactions').find({}).toArray();

    res.render('admin/transaction-list', { account: req.session.account, transactions });

})



router.get('/admin/transaction-details/:id', async (req, res) => {

    if (req.session.account === undefined) {
        return res.redirect('/admin/login');
    }

    const { id } = req.params;

    let db = await getDB();

    let transaction = await db.collection('transactions').findOne({ _id: OjectID(id) });

    res.render('admin/transaction-details', { account: req.session.account, transaction });

})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/admin/transaction-create', async (req, res) => {

    if (req.session.account === undefined) {
        return res.redirect('/admin/login');
    }

    const { transactionContent, transactionDate, transactionName
        , businessNumber, businessName, businessAddress, businessPhone, businessAgent
        , ownerID, ownerName
        , productID, } = req.body;

    let db = await getDB();

    transaction = {
        _id: new OjectID(),
        transactionContent,
        transactionDate,
        transactionName,
        businessNumber,
        businessName,
        businessAddress,
        businessPhone,
        businessAgent,
        ownerID,
        ownerName,
        productID,
    }

    await db.collection('transactions').insertOne(transaction);

    log({ type: 'Tạo giao dịch', status: true, data: { productID: transaction.productID, transaction_id: transaction._id } });

    res.json({ status: true });

})

router.post('/admin/transaction-update', async (req, res) => {

    if (req.session.account === undefined) {
        return res.redirect('/admin/login');
    }

    const { transactionContent, transactionDate, transactionName
        , businessNumber, businessName, businessAddress, businessPhone, businessAgent
        , ownerID, ownerName
        , productID, transaction_id } = req.body;

    let db = await getDB();

    newTransaction = {
        transactionContent,
        transactionDate,
        transactionName,
        businessNumber,
        businessName,
        businessAddress,
        businessPhone,
        businessAgent,
        ownerID,
        ownerName,
        productID,
    }

    await db.collection('transactions').updateOne({ _id: OjectID(transaction_id) }, { $set: newTransaction });

    log({ type: 'Cập nhật giao dịch', status: true, data: { transaction_id: transaction_id, newTransaction } });

    res.json({ status: true });

})



router.post('/admin/transaction-create/getProduct', async (req, res) => {

    if (req.session.account === undefined) {
        return res.redirect('/admin/login');
    }

    const { productID } = req.body;

    let db = await getDB();

    let product = await db.collection('products').findOne({ productID });

    if (product === null) {
        return res.json({ status: false, message: 'ID hàng hóa không chính xác.' });
    }

    res.json({ status: true, product });

})


module.exports = router;
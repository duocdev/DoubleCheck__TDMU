
const { getDB } = require('../bin/db');
const { log } = require('../bin/logger');

const router = require('express').Router();


function IDcreator() {
    let id = '';
    let length = 25;
    let group = 5;
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < length; i++) {
        if (i % group === 0 && i !== 0) {
            id += '-';
        }
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return id;
}


router.get('/admin/product-registration', async (req, res) => {

    if (req.session.account === undefined) {
        return res.redirect('/admin/login');
    }

    res.render('admin/product-registration', { account: req.session.account });
})

router.get('/admin/product-details/:productID', async (req, res) => {

    if (req.session.account === undefined) {
        return res.redirect('/admin/login');
    }

    let productID = req.params.productID;

    let db = await getDB();

    let product = await db.collection('products').findOne({ productID });

    if (product === null) {
        return res.render('/admin/errors', { message: 'Sản phẩm không tồn tại' });
    }

    res.render('admin/product-details', { account: req.session.account, product });

})

router.get('/admin/product-list', async (req, res) => {

    if (req.session.account === undefined) {
        return res.redirect('/admin/login');
    }

    let db = await getDB();

    let products = await db.collection('products').find({}).toArray();

    res.render('admin/product-list', { account: req.session.account, products });

})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/admin/product-registration', async (req, res) => {

    if (req.session.account === undefined) {
        return res.redirect('/admin/login');
    }

    const { productModel, productCode, productBrand, productVersion,
        productActiveDate, productYear, ownerID, ownerName,
        ownerPhone, ownerBuyDate, ownerAddress } = req.body;

    let db = await getDB();

    let productID = IDcreator();

    let id = await db.collection('products').findOne({ productID });

    while (id !== null) {
        productID = IDcreator();
        id = await db.collection('products').findOne({ productID });
    }

    let product = {
        productID: productID,
        productModel,
        productCode,
        productBrand,
        productVersion,
        productActiveDate,
        productYear,
        ownerID,
        ownerName,
        ownerPhone,
        ownerBuyDate,
        ownerAddress
    }



    await db.collection('products').insertOne(product);

    log({ type: 'Đăng ký sản phẩm', status: 'Thành công', data: { productID: product.productID, productModel: product.productModel } });

    res.json({ status: true, data: { productID: product.productID } });

})




router.post('/admin/product-update', async (req, res) => {

    if (req.session.account === undefined) {
        return res.redirect('/admin/login');
    }

    const { productModel, productCode, productBrand, productVersion,
        productActiveDate, productYear, ownerID, ownerName,
        ownerPhone, ownerBuyDate, ownerAddress, productID } = req.body;

    let db = await getDB();

    let newProduct = {
        productModel,
        productCode,
        productBrand,
        productVersion,
        productActiveDate,
        productYear,
        ownerID,
        ownerName,
        ownerPhone,
        ownerBuyDate,
        ownerAddress
    }

    await db.collection('products').updateOne({ productID: productID }, { $set: newProduct });

    log({ type: 'Cập nhật sản phẩm', status: 'Thành công', data: { productID: productID, newProduct } });

    res.json({ status: true });

})




router.post('admin/product-change-owner', async (req, res) => {

    if (req.session.account === undefined) {
        return res.redirect('/admin/login');
    }

    const { productID, ownerID, ownerName, ownerPhone, ownerBuyDate, ownerAddress
        , oldOwnerID, oldOwnerName, oldOwnerPhone, oldOwnerBuyDate, oldOwnerAddress
        , transactionID, transactionContent } = req.body;

    let db = await getDB();

    let newProduct = {
        ownerID,
        ownerName,
        ownerPhone,
        ownerBuyDate,
        ownerAddress
    }

    await db.collection('products').updateOne({ productID }, { $set: newProduct });

    let newTransaction = {
        productID,
        ownerID,
        ownerName,
        ownerPhone,
        ownerBuyDate,
        ownerAddress,
        oldOwnerID,
        oldOwnerName,
        oldOwnerPhone,
        oldOwnerBuyDate,
        oldOwnerAddress,
        transactionID,
        transactionContent,
        transactionDate: new Date().toLocaleString()
    }

    await db.collection('transactions').insertOne(newTransaction);

    log({ type: 'Chuyển chủ sản phẩm', status: 'Thành công', data: { productID: newProduct.productID, ownerID: newProduct.ownerID } });

    log({ type: 'Cập nhật sản phẩm', status: 'Thành công', data: { productID: newProduct.productID, productName: newProduct.productName } });

    return res.json({ status: true });

})



module.exports = router;
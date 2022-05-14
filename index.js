let port = process.env.PORT || 3000;

const { connect } = require('./bin/db');
const { adminCreator } = require('./bin/createAdmin');
(async () => {
    await connect();
    await adminCreator('admin', 'Admin@doublecheck', 'Admin');
})();

const session = require('express-session');
const MongoStore = require('connect-mongo');
const express = require('express');
const app = express();

app.use(session({
    secret: '1824801030100',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/DoubleCheck' })
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/static', express.static('public'));


app.use('/', require('./routes/accountRouter'))

app.use('/', require('./routes/productRouter'))

app.use('/', require('./routes/transactionRouter'))

app.use('/', require('./routes/researchRouter'))

/*

    admin paths : /admin/dashboard
    admin paths : /admin/login
    
    user paths : /tra-cuu/:productID
    user paths : /tra-cuu/:productID/transaction/:transactionID


*/




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
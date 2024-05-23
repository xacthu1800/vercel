const port = process.env.PORT || 8000;
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');

const home = require('./route/home.js');
//const login = require('./route/login.js');

const app = express();

// Middleware để xử lý session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Thiết lập view engine là EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Thiết lập đúng đường dẫn đến thư mục views

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', home);
//app.use('/user', login)


// Middleware xử lý lỗi
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message || 'Something went wrong!');
});

// Bắt đầu server
app.listen(port, () => {
    console.log(`Server chạy tại: localhost:${port}`);
});

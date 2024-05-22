const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bcrypt = require('bcrypt')
const session = require('express-session');
const { log } = require('console');
const { ObjectId } = require('mongodb');
const portfinder = require('portfinder');
const home = require("./route/index");
const port = process.env.PORT || 8000;

const {dataUser, dataProduct, delivery, record} = require('./src/config');



let globalSearchResult = [];

const app = express()
// conver data into JSON format
app.use(express.json())

app.use(express.urlencoded({extended: false}))

//kiểm tra trạng thái người dungf (đã login chưa)

//use ejs as the view enginne 
app.set('view engine', 'ejs');
// static file
app.use(express.static('public'))

app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }));

app.use(calculateTotalQuantity);



app.use("/", home);

app.use("/home", home);


/* 
portfinder.getPort((err, port) => {
    if (err) {
        console.error('Không thể tìm PORT trống:', err);
        return;
    }
    
    // Lắng nghe trên PORT đã tìm được
   
}); */

app.listen(port, () => {
    console.log(`Server running on :  localhost:${port}`);
});













function calculateTotalQuantity(req, res, next) {
    let totalQuantity = 0;
    if (req.session.cart) {
        for (let productId in req.session.cart) {
            totalQuantity += req.session.cart[productId];
        }
    }
    res.locals.carts = totalQuantity;
    next();
}

// Tạo mã đơn hàng từ thời gian hiện tại và tổng tiền
function generateOrderCode(tongTien) {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');

    // Tạo mã đơn hàng
    const orderCode = `${day}${month}${year}${hour}${minute}${second}`;
    return orderCode;
}

function convertCartToString(cart) {
    let cartString = '';
    for (const [product, quantity] of Object.entries(cart)) {
        cartString += `${product} - ${quantity}; `;
    }
    // Xóa dấu cách ở cuối chuỗi
    cartString = cartString.trim();
    return cartString;
}

function getCurrentDate() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0'); // Lấy ngày và đảm bảo định dạng là 2 chữ số, thêm '0' nếu cần
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và đảm bảo định dạng là 2 chữ số, thêm '0' nếu cần
    const year = now.getFullYear(); // Lấy năm

    // Kết hợp ngày, tháng và năm thành chuỗi định dạng "DD-MM-YYYY"
    const currentDate = `${day}-${month}-${year}`;

    return currentDate;
}




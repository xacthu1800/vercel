const express = require("express");
const {dataUser, dataProduct, delivery, record} = require('../src/config.js');
const { calculateTotalQuantity, generateOrderCode, convertCartToString, getCurrentDate} = require('../middleware/utils')
const bcrypt = require('bcrypt');

const router = express.Router();

// Middleware
router.use(calculateTotalQuantity);

router.get("/", calculateTotalQuantity, async (req, res, next) => {
    try {
        const product = await dataProduct.find().sort({ _id: -1 }).limit(12);
        res.render("index", { pros: product,
                             userN: req.session.username,
                              login: "login",
                               logout: "logout",
                               carts: res.locals.carts });  // Đặt tên view đúng
    } catch (error) {
        next(error);  // Chuyển lỗi tới middleware xử lý lỗi
    }
});


module.exports = router;

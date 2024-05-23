const express = require("express");
const { dataProduct } = require('../src/config');

const router = express.Router();

router.get("/home", async (req, res, next) => {
    try {
        const product = await dataProduct.find().sort({ _id: -1 }).limit(12);
        res.render("index", { pros: product, userN: req.session.username, login: "login", logout: "logout" });  // Đặt tên view đúng
    } catch (error) {
        next(error);  // Chuyển lỗi tới middleware xử lý lỗi
    }
});

router.get("/", (req, res) => {
    res.redirect("/home");
});

module.exports = router;

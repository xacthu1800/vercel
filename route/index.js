const express = require("express");
const mongoose = require('mongoose')
const {dataUser, dataProduct, delivery, record} = require('../src/config');

const router = express.Router();

router.get("/home", async (req, res, next) => {
    const product = await dataProduct.find().sort({ _id: -1 }).limit(12);
    return     res.render("index", { pros: product, userN: req.session.username, login: "login", logout: "logout" });
});

module.exports = router;
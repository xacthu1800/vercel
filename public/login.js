/* const express = require("express");
const {dataUser, dataProduct, delivery, record} = require('../src/config.js');
const { calculateTotalQuantity, generateOrderCode, convertCartToString, getCurrentDate} = require('../middleware/utils.js')
const router = express.Router();

// Middleware
router.use(calculateTotalQuantity);

// User signup
router.post('/signup', async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    // Check if the user already exists in the database
    const existingUser = await dataUser.findOne({ name: data.name });
    if (existingUser) {
        res.render('signup', { error: 'User has already been taken' });
        return;
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword;

    const userdata = await dataUser.insertMany(data);
    console.log(userdata);
    res.render('login', { message: 'Login successfully' });
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const check = await dataUser.findOne({ name: req.body.username });
        if (!check) {
            res.render('login', { error: 'User not found, please try again' });
            return;
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        // Đăng nhập thành công
        if (isPasswordMatch) {
            req.session.username = req.body.username;
            const product = await dataProduct.find().sort({ _id: -1 }).limit(12);
            res.render('index', { pros: product, userN: req.session.username });
        } else {
            res.send('wrong password');
        }
    } catch (err) {
        res.send('wrong detail');
        console.log(err);
    }
});

router.get("/signup",(req,res)=>{
    res.render("signup")
})

router.get("/logout", async (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router */
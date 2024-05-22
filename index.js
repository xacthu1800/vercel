const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const home = require('./route/index')
const session = require('express-session');


const port = process.env.PORT || 8000;






const app = express()

app.use('/', home)


//kiểm tra trạng thái người dungf (đã login chưa)

//use ejs as the view enginne 
app.set('view engine', 'ejs');
// static file
app.use(express.static('public'))



app.listen(port, () => {
    console.log(`Server running on :  localhost:${port}`);
});












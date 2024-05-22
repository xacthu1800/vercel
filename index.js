const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const home = require('./route/index.js');
const session = require('express-session');

const port = process.env.PORT || 8000;

const app = express();

// Middleware for session handling
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Use home router for `/home` and root (`/`) paths
app.use('/', home);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on :  localhost:${port}`);
});

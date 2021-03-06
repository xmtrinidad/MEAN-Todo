const express = require('express');
const cors = require('cors');
const passport = require('passport');

// Mongoose & Database
const mongoose = require('mongoose');
const config = require('./config/database');

// Mongoose Connection
mongoose.connect(config.database);
// On Mongoose Connection
mongoose.connection.on('connected', () => {
    console.log(`Connected to database ${config.database}`);
});
// On Mongoose Error
mongoose.connection.on('error', (err) => {
    console.log(`Database error: ${err}`);
});

// Routes
const userRoutes = require('./routes/user');
const indexRoutes = require('./routes/index');

// Set up express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Passport
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Server port
const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
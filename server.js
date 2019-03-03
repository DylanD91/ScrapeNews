// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

// PORT
const PORT = process.env.PORT || 3030;

// Initialize Express
const app = express();

// Mongo Database
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_fsv9hr4g:7i70qf0akb1f7hip7tjb880at2@ds157895.mlab.com:57895/heroku_fsv9hr4g";
mongoose.connect(MONGODB_URI, {useNewUrlParser:  true});



// Setting Mongoose
mongoose.Promise = Promise;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
app.engine('handlebars' , exphbs({ defaultLayout: 'main' }));
app.set('view engine' , 'handlebars');

// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Start the server
app.listen(PORT, function() {
    console.log('App running on on port 3030');
});
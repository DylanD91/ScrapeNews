// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const moment = require("moment");

// Initialize Express
const app = express();
app.use(express.static("public"));

// Require all models
const db = require("./models");

// PORT
mongoose.connect(process.env.MONGODB_URI || "mongodb://heroku_fsv9hr4g:7i70qf0akb1f7hip7tjb880at2@ds157895.mlab.com:57895/heroku_fsv9hr4g");

const PORT = process.env.PORT || 3030;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars' , exphbs({ defaultLayout: 'main' }));
app.set('view engine' , 'handlebars');

// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Start the server
app.listen(PORT, function() {
    console.log('App running on on port 3030');
});
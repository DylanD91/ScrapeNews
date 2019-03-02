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
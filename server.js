// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const app = express();

// PORT
const PORT = process.env.PORT || 3030;

// Setting Mongoose
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:', {useNewUrlParser: true});

// Handlebars
app.engine('handlebars' , exphbs({ defaultLayout: 'main' }));
app.set('view engine' , 'handlebars');

// Start the server
app.listen(PORT, function() {
    console.log('App running on on port 3030');
});
// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const axios = require("axios");
const cheerio = require("cheerio");


// PORT
const PORT = process.env.PORT || 3030;
const app = express();

// Setting Mongoose
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:', {useNewUrlParser: true});
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;

// Handlebars
app.engine('handlebars' , exphbs({ defaultLayout: 'main' }));
app.set('view engine' , 'handlebars');

// Start the server
app.listen(PORT, function() {
    console.log('App running on on port 3030');
});

// Routes

app.get('/', function (req, res) {
    db.Article.find({}, (error, dbArticle) => {
      if (error) {
        console.log(error);
      }
      console.log(dbArticle)
      res.render('index', {
        articles: dbArticle
      });
    })
  });
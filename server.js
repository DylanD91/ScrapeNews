// Some of the code I used is from week 18 activity 20
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

  // A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
    // Grabbing the HTML body with Axios
    axios.get("https://www.nytimes.com/").then(function(response) {
      console.log(response.data)
    //   Loading it into Cheerio
      var $ = cheerio.load(response.data);
    })
  })


// Now, we grab every h2 within an article tag, and do the following:
$(".module--news .block-link").each(function(i, element) {
   var result = {};
})
  
// Add the text and href of every link, and save them as properties of the result object
result.title = $(this)
.children(".media__content")
.children("h3")
.text()
//replace functions to remove weird spacing and characters
.replace(/\s\s+/g, "")
.replace(/\\/g,"");

          
result.summary = $(this)
.children(".media__content")
.children("p")
.text()

//replace functions to remove weird spacing and characters
.replace(/\s\s+/g, "")
.replace("/","")
.replace(/\\/g,"")

result.link = `https://www.nytimes.com/${
$(this).children(".block-link__overlay-link").attr("href")
}`;

// Create a new Article using the `result` object built from scraping
db.Article.create(result)
.then(function(dbArticle) {
  console.log(dbArticle);
})
.catch(function(err) {
  console.log(err);
});
// Send a message to the client
res.send(result);

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
    db.Article.find({})
      .then(function (dbNote) {
    //Send back to the client
        res.json(dbNote);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Route for getting all Articles from the db
app.get("/articles", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        // Send the articles to client
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
    });

    app.get('/saved', function (req, res) {
        db.Article.find({
          saved: true
        }, (error, Saved) => {
          if (error) {
            console.log(error);
          }
          console.log(Saved)
          
          res.render('saved', {
            Saved: Saved
          });
        });
      });
      
      
      // Route for grabbing a specific Article by id, populate it with it's note
      app.get("/articles/:id", function(req, res) {
        db.Article.findOne({ _id: req.params.id })
          // Populate notes
          .populate("note")
          .then(function(dbArticle) {
            res.json(dbArticle);
          })
          .catch(function(err) {
            res.json(err);
          });
      });
      
      // Route for saving/updating an Article's associated Note
      app.post("/articles/:id", function(req, res) {
        db.Note.create(req.body)
          .then(function(dbNote) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
          })
          .then(function(dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
      });
      

// Start the server
app.listen(PORT, function() {
    console.log('App running on on port 3030');
});

  

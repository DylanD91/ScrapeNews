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
const PORT = process.env.PORT || 3000;
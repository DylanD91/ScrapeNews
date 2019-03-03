// Require mongoose
const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    saved: {
      type: Boolean,
      default: false
    },
  });
// Creating article Schema
const Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
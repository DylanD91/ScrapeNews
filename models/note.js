// Mongoose and Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Moment
const moment = require('moment');

// Library Schema for Comments
const NoteSchema = new Schema({

    name: {
      type: String
      // unique: true
    },
    note: {
      type: String
    },
    dateCreated: {
      type: Date,
      default: Date.now
    },
});

// Mongoose Method
var Comment = mongoose.model('Note', NoteSchema);
// Export
module.exports = Note;

// Mongoose and Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Moment
const moment = require('moment');

// Library Schema for Comments
const NoteSchema = new Schema({
    title: String,
    body: String
    
});

// Mongoose Method
var Note = mongoose.model('Note', NoteSchema);
// Export
module.exports = Note;

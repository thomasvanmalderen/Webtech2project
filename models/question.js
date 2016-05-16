var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user'),
    Discussion = require('./discussion');
    Answer = require('./answer');

var QuestionSchema = new Schema({
    question: String,
    poster: {type: String, ref: 'User'},
    topic: {type: String, ref: 'Discussion'},
    answers: [Answer]
});

module.exports = mongoose.model('Question', QuestionSchema);
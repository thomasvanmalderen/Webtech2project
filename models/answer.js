var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user'),
    Question = require('./question');

var AnswerSchema = new Schema({
    answer: String,
    poster: {type: String, ref: 'User'},
    question: {type: String, ref: 'Question'}
});

module.exports = mongoose.model('Answer', AnswerSchema);
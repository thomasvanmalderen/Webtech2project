var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user')
    //Question = require('./question');

var DiscussionSchema = new Schema({
    topic: String,
    locked: {type: Boolean, default: false},
    questions: {type: String, ref: 'Question'},
    admin: {type: String, ref: 'User'}
});

module.exports = mongoose.model('Discussion', DiscussionSchema);
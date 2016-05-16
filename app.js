var express = require('express'),
    bodyParser = require('body-parser'),
    jade = require('jade'),
    mongoose = require('mongoose');
var app = express(),
    port = process.env.PORT || 8080,
    router = express.Router();
var userController = require('./controllers/user-controller'),
    discussionController = require('./controllers/discussion-controller'),
    questionController = require('./controllers/question-controller'),
    answerController = require('./controllers/answer-controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoURI = "mongodb://localhost:27017/askIMD";
mongoose.connect(mongoURI);

app.set('view engine', 'jade');

router.use( function (req, res, next) {
    console.log('Succes!');
    next();
});

//APP ONLY LISTENS TO /API
app.use('/api', router);

//====================
//DEFINE ROUTES
//  DEFINE ROOT
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our API!' });   
});
//  DEFINE USERS ACTIONS
router.use('/users', userController);
//  DEFINE DISCUSSION ACTIONS
router.use('/discussions', discussionController);
//  DEFINE QUESTION ACTIONS
router.use('/questions', questionController);
//  DEFINE ANSWER ACTIONS
router.use('/answers', answerController);


// OUR FRONT-END
app.use('/create', function(req, res) {
    res.render('create')
});

app.use('/discussion/:discussion_id', 
function (req, res){
  var discussion_id= req.params.discussion_id;
    res.render('discussion', {_id: discussion_id});
});

// OUR PORT
app.listen(port);
console.log('Everything happens on port ' + port);
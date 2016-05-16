var express = require('express'),
    router = express.Router();
var Discussion = require('../models/discussion'),
    User = require('../models/user'),
    Question = require('../models/question')

router.route('/')
    .post(function (req, res) {
        var question = new Question();
        question.question = req.body.question;
        question.poster = req.body.poster;
        question.topic = req.body.topic;

        question.save(function (error, question) {
            if (error)
                res.send(error);
            res.json({ message: 'Question created!', question: question })
        });
    })
    .get(function (req, res) {
        Question
            .find()
            .populate('poster', 'username')
            .populate('topic', 'topic')
            .exec(function (error, questions) {
                if (error)
                    res.send(error);
                res.json(questions);
            })
    });
router.route('/:question_id')
    .put(function (req, res) {
        Question.findById(
            req.params.question_id,
            function (error, question) {
                if (error)
                    res.send(error);
                question.question = req.body.question;
                question.poster = req.body.poster;
                question.topic = req.body.topic;
                question.save(function (error) {
                    if (error)
                        res.send(error);
                    res.json({message: 'Question updated!', question: question})
                });
            }
        )
    })
    .get(function (req, res) {
        Question
            .findById(req.params.question_id)
            .populate('poster', 'username')
            .populate('topic', 'topic')
            .exec(function (error, question) {
                if (error)
                    res.send(error);
                res.json(question);
            })
    })
    .delete(function (req, res) {
        Question
            .findById(req.params.question_id)
            .exec(function (error, question) {
                if (error)
                    res.send(error);
                question.remove(function (error) {
                    if (error)
                        res.send(error);
                    res.json({message:'Question deleted!'});
                })
            })
    });
module.exports = router;
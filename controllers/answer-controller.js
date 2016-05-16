var express = require('express'),
    router = express.Router();
var User = require('../models/user'),
    Question = require('../models/question'),
    Answer = require('../models/answer')

router.route('/')
    .post(function (req, res) {
        var answer = new Answer();
        answer.question = req.body.question;
        answer.poster = req.body.poster;
        answer.answer = req.body.answer;

        answer.save(function (error, answer) {
            if (error)
                res.send(error);
            res.json({ message: 'Answer created!', answer: answer })
        });
    })
    .get(function (req, res) {
        Answer
            .find()
            .populate('poster', 'username')
            .populate('question', 'question')
            .exec(function (error, answers) {
                if (error)
                    res.send(error);
                res.json(answers);
            })
    });
router.route('/:answer_id')
    .put(function (req, res) {
        Answer.findById(
            req.params.answer_id,
            function (error, answer) {
                if (error)
                    res.send(error);
                answer.question = req.body.question;
                answer.poster = req.body.poster;
                answer.answer = req.body.answer;
                answer.save(function (error) {
                    if (error)
                        res.send(error);
                    res.json({message: 'Answer updated!', answer: answer})
                });
            }
        )
    })
    .get(function (req, res) {
        Answer
            .findById(req.params.answer_id)
            .populate('poster', 'username')
            .populate('question', 'question')
            .exec(function (error, answer) {
                if (error)
                    res.send(error);
                res.json(answer);
            })
    })
    .delete(function (req, res) {
        Answer
            .findById(req.params.answer_id)
            .exec(function (error, answer) {
                if (error)
                    res.send(error);
                answer.remove(function (error) {
                    if (error)
                        res.send(error);
                    res.json({message:'Answer deleted!'});
                })
            })
    });
module.exports = router;
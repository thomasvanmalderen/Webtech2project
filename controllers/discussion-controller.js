var express = require('express'),
    router = express.Router();
var Discussion = require('../models/discussion'),
    User = require('../models/user');

router.route('/')
    .post(function (req, res) {
        var discussion = new Discussion();
        discussion.topic = req.body.topic;
        discussion.admin = req.body.admin;

        discussion.save(function (error, discussion) {
            if (error)
                res.send(error);
            res.json({ message: 'Discussion created!', discussion: discussion })
        });
    })
    .get(function (req, res) {
        Discussion
            .find()
            .populate('admin', 'username')
            .exec(function (error, discussions) {
                if (error)
                    res.send(error);
                res.json(discussions);
            })
    });
router.route('/:discussion_id')
    .put(function (req, res) {
        Discussion.findById(
            req.params.discussion_id,
            function (error, discussion) {
                if (error)
                    res.send(error);
                discussion.topic = req.body.topic;
                discussion.admin = req.body.admin;
                discussion.locked = req.body.locked;
                discussion.save(function (error) {
                    if (error)
                        res.send(error);
                    res.json({message: 'Discussion updated!', discussion: discussion})
                });
            }
        )
    })
    .get(function (req, res) {
        Discussion
            .findById(req.params.discussion_id)
            .populate('admin', 'username')
            .exec(function (error, discussion) {
                if (error)
                    res.send(error);
                res.json(discussion);
            })
    })
    .delete(function (req, res) {
        Discussion
            .findById(req.params.discussion_id)
            .exec(function (error, discussion) {
                if (error)
                    res.send(error);
                discussion.remove(function (error) {
                    if (error)
                        res.send(error);
                    res.json({message:'Discussion deleted!'});
                })
            })
    });
module.exports = router;
var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.route('/')
    .post(function(req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;

        user.save(function (error) {
            if (error)
                res.send(error);
            res.json({ message: 'User created!', user: user})
        })
    })
    .get(function(req, res) {
        User.find(function(error, users) {
            if (error)
                res.send(error);
            res.json(users);
        })
    });
router.route('/:user_id')
    .get(function (req, res) {
        User.findById(req.params.user_id, function (error, user) {
            if (error)
                res.send(error);
            res.json(user);
        })
    })
    .put(function (req, res) {
        User.findById(req.params.user_id, function(error, user) {

            if (error)
                res.send(error);

            user.username = req.body.username;
            user.password = req.body.password;

            // save the bear
            user.save(function(error) {
                if (error)
                    res.send(error);

                res.json({ message: user.username+' updated!', user: user });
            });

        });
    })
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(error, user) {
            if (error)
                res.send(error);

            res.json({ message: 'Successfully deleted' });
        });
    });
module.exports = router;
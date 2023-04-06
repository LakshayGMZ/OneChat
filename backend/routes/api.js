const express = require('express');
const { JWTTokenVerify } = require('../middlewares');
const { Message } = require('../models/message')
const { User } = require('../models/user')
const router = express.Router();
require('dotenv').config({path: "../.env"});

router.use(JWTTokenVerify);

router.post('/message', function(req, res) {
    const body = req.body;
    const timestamp = parseInt(new Date().getTime()/1000);
    const token = req.headers.authorization;
    User.findOne({accessToken: token}, (err, result) => {
        if (!err && result) {
            const data = {
                content: body.content,
                timestamp: String(timestamp),
                uuid: result.uuid,
                username: result.username,
                id: String(timestamp + Math.floor((Math.random() * 1000000) + 1) + Math.floor((Math.random() * 10000) + 1))
            };
            (new Message(data)).save();
            res.status(200).send({error: 0, ...data});

        } else {
            res.status(401).send({error: 1014, message: "some err eccured"})
        };
    })
});

router.get('/messages', function(req, res) {
    const uuid = req.body.uuid;
    Message.find({}).sort({timestamp: -1}).exec((err, result) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404);
        }
    });
});

module.exports = router;

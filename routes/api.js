const express = require('express');
const { JWTTokenVerify } = require('../middlewares');
const { Message } = require('../models/message')
const router = express.Router();
require('dotenv').config();

router.use(JWTTokenVerify);

router.post('/message', function(req, res) {
    const body = req.body;
    const timestamp = parseInt(new Date().getTime()/1000);
    const data = {
        content: body.content,
        timestamp: String(timestamp),
        uuid: body.uuid,
        id: String(timestamp + Math.floor((Math.random() * 100000) + 1) + Math.floor((Math.random() * 1000) + 1))
    };
    (new Message(data)).save();
    res.status(200).send({error: 0, ...data});
});

router.get('/messages', function(req, res) {
    const uuid = req.body.uuid;
    Message.find({}, (err, result) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404);
        }
    });
})

module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');
const JWT = require('jsonwebtoken');

require('dotenv').config({path: "../.env"});

const { User } = require("../models/user")

router.post('/login', function (req, res) {
    const data = req.body;
    User.findOne({ email: data.email }, (err, user) => {
        console.log("findone: ", err, user);
        if (user) {

            bcrypt.compare(data.password, user.passwordHash, (err2, result) => {
                console.log("compare: ", err2, result);
                if (result) {
                    console.log(result);
                    res.status(200).send({
                        error: 0,
                        token: user.accessToken,
                        email: user.email,
                        username: user.username,
                        uuid: user.uuid
                    });
                } else {
                    console.log('no result');
                   res.status(400).send({ error: 1012, message: "Wrong Password!!" });
                }   
            })
        } else {
            res.status(400).send({ error: 1011, message: "Unkown Email" });
        }
})});

router.post('/register', function (req, res) {
    const data = req.body;
    const uuid = String(uuidv4());

    bcrypt.genSalt(parseInt(process.env.salt_rounds), (err, salt) => {
        console.log(err);
        bcrypt.hash(data.password, salt, (err2, hash) => {
            console.log(err2);
            if (hash) {
                const token = JWT.sign(uuid, process.env.secret);
                const user = new User({
                    uuid: uuid,
                    email: data.email,
                    mode: "normal",
                    username: data.username,
                    passwordHash: hash,
                    salt: salt,
                    rounds: parseInt(process.env.salt_rounds),
                    accessToken: token
                });
                user.save();

                res.send({ token: token, error: 0 });
            }
        })
    }
    )
});


module.exports = router;

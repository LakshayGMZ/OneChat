const JWT = require("jsonwebtoken");
const express = require("express");
require('dotenv').config({path: "../.env"});

exports.JWTTokenVerify = (req, res, next) => {
    const token = req.headers.authorization;
    JWT.verify(token, process.env.secret, (err, result) => {
        if (!err && result) {
            return next();
        } else {
            return res.status(401).send({error: 1013,
                message: "Invalid Token"});
        }
    });
}


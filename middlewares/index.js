const JWT = require("jsonwebtoken");
const express = require("express");

exports.JWTTokenVerify = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    JWT.verify(token, process.env.secret, (err, result) => {
        console.log(result, err);
        if (!err && result) {
            return next();
        } else {
            return res.status(401).send({error: 1013,
                message: "Invalid Token"});
        }
    });
}


const JWT = require("jsonwebtoken");
const { User } = require("../models/user");
require('dotenv').config({path: "../.env"});

function getDataFromToken(socket, token, next) {
    User.findOne({accessToken: token}, (err, result) => {
        if (!err && result) {
            const details = {
                uuid: result.uuid,
                username: result.username,
                email: result.email,
            };
            socket.data = details;
            next();

        } else {
            return next(new Error({error: 1013, message: "Invalid Token"}));
        };
    })
}


exports.JWTTokenVerifyWS = (socket, next) => {
    const token = socket.handshake.auth.authorization;
    JWT.verify(token, process.env.secret, (err, result) => {
        if (!err && result) {
            getDataFromToken(socket, token, next);
        } else {
            return next(new Error({error: 1013, message: "Invalid Token"}));
        }
    });
}




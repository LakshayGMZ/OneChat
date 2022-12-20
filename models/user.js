const { model, Schema } = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');


const userSchema = new Schema({
    uuid: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    mode: String,
    username: String,
    passwordHash: String,
    salt: String,
    rounds: Number,
    accessToken: String

})

const User = new model("user", userSchema);

exports.User = User;
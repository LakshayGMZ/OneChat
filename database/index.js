const mongoose = require('mongoose');
const {User} = require("../models/user")
require('dotenv').config();


function main() {
    mongoose.connect(process.env.mongodb_uri, {useNewUrlParser: true});
    mongoose.connection.on(
        "connected", () => console.log('Connected to database.')
    );
}

exports.main = main;
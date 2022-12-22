const { model, Schema } = require("mongoose");

const messageSchema = new Schema({
    content: String,
    timestamp: String,
    id: {
        type: String,
        unique: true,
    },
    uuid: String,
    username: String,
});

const Message = new model("message", messageSchema);

exports.Message = Message;
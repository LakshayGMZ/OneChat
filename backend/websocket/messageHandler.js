
exports.messageHandler = (ws, socket) => {
    function onMessage(payload) {
        socket.broadcast.emit("MESSAGE_RECEIVED", {...(socket.data), content: payload.content, id: payload.id})
    }

    socket.on("ON_MESSAGE", onMessage);
}


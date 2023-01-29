
exports.messageHandler = (ws, socket) => {
    function onMessage(payload) {
        console.log("braodcasting event");
        socket.broadcast.emit("MESSAGE_RECEIVED", {...(socket.data), content: payload.content, id: payload.id})
    }

    socket.on("ON_MESSAGE", onMessage);
}


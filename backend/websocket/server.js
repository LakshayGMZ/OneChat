const { Server } = require('socket.io');
const { JWTTokenVerifyWS } = require('./middleware')
const { messageHandler } = require('./messageHandler')

function startWebSocket(websocket) {
    
    websocket.use(JWTTokenVerifyWS);

    websocket.on("connection", (socket) => {
        console.log("Listening to websocket on port: " + socket.port);
        socket.on('disconnect', () => {
            console.log("Disconnecting from websocket");
        })
        socket.join("everyone_room");
        messageHandler(websocket, socket);

        websocket.engine.on("connection_error", (err) => {
            console.log(err.req);
            console.log(err.code);
            console.log(err.message);
            console.log(err.context);
        });

        socket.conn.once("upgrade", () => {
            // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
            console.log("upgraded transport", socket.conn.transport.name); // prints "websocket"
        })
    });

}

exports.startWebSocket = startWebSocket

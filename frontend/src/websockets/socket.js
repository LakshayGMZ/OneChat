import React from "react";
import socketio from "socket.io-client"

const options = {
    withCredentials: true,
    auth: {
        authorization: localStorage.token
    }
}

export const socket = socketio.connect("ws://localhost:8000/", options);
export const SocketContext = React.createContext();
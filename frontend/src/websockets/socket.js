import React from "react";
import socketio from "socket.io-client"

const options = {
    withCredentials: true,
    auth: {
        authorization: localStorage.token
    }
}

export const socket = socketio.connect(import.meta.env.VITE_BASE_URL, options);
export const SocketContext = React.createContext();
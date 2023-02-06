import React, { useCallback, useContext, useEffect } from "react";
import { SocketContext } from "./socket";

export default function messageHandler(setMessage) {

    const recieveMessageHandler = useCallback((payload) => {
        setMessage((prevMessage) => ([<MessageBox author={payload.username} content={payload.content} id={payload.id} key={payload.id} />, ...prevMessage]));
    }, [])

    const socket = useContext(SocketContext);
    useEffect(() => {
        socket.on("MESSAGE_RECEIVED", recieveMessageHandler)

        return () => {
            socket.off("MESSAGE_RECEIVED", recieveMessageHandler);
        };
    }, [socket, recieveMessageHandler])
}
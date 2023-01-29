import React, { useCallback, useContext, useEffect } from "react";
import { SocketContext } from "./socket";

export default function MessageEmitter(message, sendCount) {
    const socket = useContext(SocketContext);
    useEffect(() => {
        console.log("going to send data now.");
        

        //socket.on("MESSAGE_RECEIVED")


    }, [sendCount])
    
    
}

function MessageReceiveHandler(payload) {
    console.log("received message: " + JSON.stringify(payload));
}
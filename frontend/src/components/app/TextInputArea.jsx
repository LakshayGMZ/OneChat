import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, TextField } from "@mui/material";
import MessageBox from "./MessageBox";
import genID from "../../utilities"
import { SocketContext } from "../../websockets/socket";


export default function TextInputArea(props) {
    const [value, setValue] = useState('');

    const recieveMessageHandler = useCallback((payload) => {
        console.log(payload);
        props.setMessage((prevMessage) => ([<MessageBox author={payload.username} content={payload.content} id={payload.id} key={payload.id} />, ...prevMessage]));
    }, [])

    const socket = useContext(SocketContext);
    useEffect(() => {
        socket.on("MESSAGE_RECEIVED", recieveMessageHandler)

        return () => {
            socket.off("MESSAGE_RECEIVED", recieveMessageHandler);
        };
    }, [socket, recieveMessageHandler])

    function handleSend() {
        setValue(val => val.trim());
        if (value) {
            const message = value;
            setValue('');
            const nonce = genID();


            props.setMessage((prevValue) => (
                [<MessageBox author={localStorage.username} content={message} id={nonce} unsent={true} key={nonce} />, ...prevValue]
            ));


            axios.post('/api/message', {
                content: message,
                nonce: nonce
            })
                .then(res => {
                    if (res.status == 200) {
                        document.getElementById(`message-${nonce}`).classList.remove("UnsentMessageBox");
                        console.log("sending event message");
                        socket.emit("ON_MESSAGE", {
                            content: message,
                            id: res.data.id,
                        });
                    }
                })
        }
    }

    return (
        <div className="InputBoxMainChat">
            <TextField
                fullWidth
                focused={false}
                placeholder="Message Here"
                size="small"
                multiline
                maxRows={4}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={handleSend}>
                            <SendIcon
                                size="large"
                                style={{ color: "black" }}
                            />
                        </IconButton>
                    )
                }}
                value={value}
                onChange={(event) => { setValue(event.target.value) }}
                onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                    } else if (e.shiftKey && e.key === "Enter") {
                        setValue(valv => { valv + "\n" });
                    }
                }}
            />
        </div>
    )
}


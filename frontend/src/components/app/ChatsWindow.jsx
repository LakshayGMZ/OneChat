import React, { useEffect, useRef, useState } from "react";
import { Divider, IconButton, modalUnstyledClasses, TextField } from "@mui/material";
import TextInputArea from "./TextInputArea";
import MessageBox from "./MessageBox";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";

export default function ChatsWindow() {
    const messagesEndRef = useRef(null);
    const [Messages, setMessage] = useState([]);

    useEffect(() => {
        axios.get("/api/messages/")
            .then(res => res.data)
            .then(res => {
                console.log(res);
                setMessage(res.map(message =>
                    <MessageBox author={message.username} content={message.content} id={message.id} key={message.id} />
                ));

            })
    }, [])

    return (
        <div className="ChatWindow">
            <div className="ChatStatusPane">
                <div className="UserStatusIcon">
                    <IconButton size="large" onClick={() => {
                        localStorage.clear();
                        window.location.reload(false);
                    }}>
                        <LogoutIcon fontSize="inherit" />
                    </IconButton>
                </div>
            </div>

            <div className="ChatScreen">
                <div className="ScrollingChats" id="ChatsContainer">
                    {Messages}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* <Divider variant="middle" sx={{ margin: "10px 20px" }} flexItem /> */}

            <TextInputArea setMessage={setMessage} />
        </div>

    )
}


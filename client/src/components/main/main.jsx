import { BorderStyle, Calculate, SendOutlined } from "@mui/icons-material";
import React, { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import InputBox from "./InputBox";
import LogOutButton from "./LogOutButton";
import MessageBox from "./MessageBox";

const FirstPane = {
    //height: "100vh",
    width: "20%",
    //backgroundColor: "#FF0000",
    //display: "flex",
    boxSizing: "border-box"
};

const SecondPane = {
    height: "inherit",
    width: "60%",
    backgroundColor: "#474E68",
    //display: "flex"
};

const InputBoxStyle = {
    position: "absolute",
    bottom: 0,
    width: "inherit",
    backgroundImage: "linear-gradient(rgba(0,0,0,0) 5%, #474E68 15%)",
    height: "60px",
    textAlign: "center"
};

const DetailsDiv = {
    position: "absolute",
    top: 0,
    width: "inherit",
    //backgroundColor: "yellow",
    height: "50px"
};

const ThirdPane = {
    //height: "100vh",
    width: "20%",
    //backgroundColor: "aqua",
    //display: "flex",
    boxSizing: "border-box"
};

const FourthPane = {
    width: "100%",
    backgroundColor: "yellow",
    height: "30px"
}


export default function Main() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [timestamp, setTimestamp] = useState(0);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!localStorage.getItem('token'))
            navigate('/')
        else {
            fetch('/api/messages', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.token,
                },
                method: "GET"
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setMessages(res.map((message) => 
                    <div>
                    <MessageBox 
                        key={message.id}
                        content={message.content}
                    />
                    </div>
                ));
                setTimeout(() => {
                    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: "end" });
                }, 200);
            })
        }
    }, [timestamp]);

    return (
        <div>
            <div style={{ backgroundColor: "#404258", display: "flex", position: "relative", height: "calc(100vh - 30px)" }}>

                <div style={FirstPane}>

                </div>

                <div style={SecondPane}>

                    <div style={DetailsDiv}>

                    </div>
                    <div style={{ display: "flex", flexDirection: "column-reverse", overflow: "hidden", height: "calc(100vh - 60px)" }}>

                        <div className="MainChatContainer" style={{ overflowY: "auto" }}>
                            {messages}

                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    <div style={InputBoxStyle}>
                        <InputBox setTimestamp={setTimestamp} />
                    </div>

                </div>

                <div style={ThirdPane}>

                    <LogOutButton />

                </div>

            </div>
            <div style={FourthPane}>
            </div>
        </div>
    )
};
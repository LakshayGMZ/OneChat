
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";

const InputBoxStyle = {
    backgroundColor: "#6B728E",
    borderRadius: "12px",
    color: "green"
};


export default function InputBox(props) {
    const [Text, setText] = useState('');

    function handleSend() {
        console.log(String(Text));
        setText('');
        props.setTimestamp(String(parseInt(new Date().getTime()/1000)));

        fetch('/api/message', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token,
            },
            method: "POST",
            body: JSON.stringify({
                content: Text,
                uuid: localStorage.getItem("uuid")

            })
        })
    }

    return (

        <div style={{ margin: "0 4%", color: "white" }}>
            <TextField
                size="sm"
                placeholder="Small"
                style={InputBoxStyle}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={handleSend}>
                            <SendIcon
                                size="large"
                                style={{ color: "white" }}
                            />
                        </IconButton>
                    ),
                }}
                value={Text}
                onChange={(event) => { setText(event.target.value) }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        handleSend();
                    }
                }}
                fullWidth
            />
        </div>

    )
}
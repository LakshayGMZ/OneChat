import React, { useState } from "react";
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, TextField } from "@mui/material";

export default function TextInputArea() {

    const [value, setValue] = useState('');

    function handleSend() {
        setValue(val => val.trim());
        if (value) {
            axios.post('/api/message', {
                content: value,
                uuid: localStorage.getItem("uuid")
            })
            .then(res => res.data)
            .then(res => console.log(res))
            setValue('');
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
                        setValue(valv => {valv + "\n"});
                    }
                }}
            />
        </div>
    )
}
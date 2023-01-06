import React from "react";
import PersonIcon from '@mui/icons-material/Person';

export default function MessageBox(props) {
    return (
        <div className="MessageBoxContainer">
            <div className="MessagePFPArea">

                <PersonIcon fontSize="large" />

            </div>
            <div className="MessageContentContainer">
                <div className="MessageAuthor">
                    <span>{props.author}</span>
                </div>

                <div className="MessageContent">
                    <span>{props.content}</span>
                </div>
            </div>
        </div>
    )
}
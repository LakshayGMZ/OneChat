
import { Divider } from "@mui/material";
import React from "react";

const BoxCSS = {
    width: "fit-content",
    minHeight: "50px",
    margin: "20px",
    position: "relative",
    display: "flex",
};

const PFPArea = {
    backgroundColor: "yellow",
    height: "35px",
    aspectRatio: "1/1",
    borderRadius: "50%",
    boxSizing: "border-box",
    display: "inline-flex",
    marginRight: "15px",
    alignSelf: "baseline",
    // position: "absolute",
    // top: 0
};

const DividerArea = {
    width: "3px",
    backgroundColor: "#6a717c",
    display: "inline-block",
    position: "absolute",
    top: 0,
    bottom: 0,
    margin: "3px 0"
}
const MessageArea = {
    marginLeft: "10px",
    display: "inline-block",
    color: "white"
};

const AuthorArea = {

    color: "white",
    fontSize: "1.2rem"
};

export default function MessageBox(props) {

    return (
        <div style={BoxCSS}>

            <div style={PFPArea}>
                {/* PFP Area */}

            </div>

            <div style={{ display: "inline-block" }}>
                <div style={AuthorArea}>
                    {props.author}
                </div>

                <div style={{ position: "relative" }}>
                    <div style={DividerArea}></div>
                    <div style={MessageArea}>
                        {/* Chat Area */}
                        <p>{props.content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
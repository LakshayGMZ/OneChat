
import { Divider } from "@mui/material";
import React from "react";

const BoxCSS = {
    width: "fit-content",
    minHeight: "50px",
    margin: "20px",
    borderRadius: "7px",
    diplay: "flex",
    position: "relative",
};

const PFPArea = {
    backgroundColor: "yellow",
    height: "35px",
    aspectRatio: "1/1",
    borderRadius: "50%",
    boxSizing: "border-box",
    display: "inline-block",
    margin: "5px",
};

const DividerArea = {
    width: "3px",
    backgroundColor: "#6a717c",
    display: "inline-block",
    position: "absolute",
    top: 0,
    bottom: 0,
    margin: "2px 5px"
}
const MessageArea = {
    marginLeft: "15px",
    display: "inline-block",
    color: "white"
};

export default function MessageBox(props) {

    return (
        <div style={BoxCSS}>
            <div style={PFPArea}>
                {/* PFP Area */}

            </div>
            <div style={DividerArea}></div>
            {/* <Divider orientation="vertical" variant="fullHeight"/> */}
            <div style={MessageArea}>
                {/* Chat Area */}
                <p>{props.content}</p>
            </div>

        </div>
    )
}
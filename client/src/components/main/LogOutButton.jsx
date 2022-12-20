import { Button } from "@mui/material";
import React from "react";

const styleButton = {
    position: "absolute",
    width: "inherit",
    textAlign: "center"
    
}

export default function LogOutButton() {
    return (
        <div style={styleButton}>
        <Button
        variant="contained"
        style={{width: "80%", margin: "20px auto"}}
        onClick={() => {
            localStorage.clear();
            window.location.reload(false);
        }}
        >
            LogOut
        </Button>
        </div>
    )
}
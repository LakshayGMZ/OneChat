import React, { useEffect } from "react";
import {isMobile} from "react-device-detect";
import "../../stylesheets/app/mainapp.css"
import MemberSelector from "./MemberSelector";
import ChatsWindow from "./ChatsWindow";
import TextInputArea from "./TextInputArea";
import { useNavigate } from "react-router-dom";

export default function MainApp() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token'))
            navigate('/')
    }, []);

    return (
        <div className="MarginedRoundedContainer">
            {{isMobile} && <MemberSelector />}

            <ChatsWindow />
        </div>
    )
}
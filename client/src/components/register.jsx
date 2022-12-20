import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const divContent = {
    maxWidth: "fit-content",
    textAlign: "center",
    height: "fit-content",

    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    margin: "auto",

    backgroundColor: "#D3D3D3",
    borderRadius: "12px",
    //border: "1px black solid",

    padding: "1em"

}

const InputCSS = {
    display: "flex",
    margin: "17px 20px",

}

const DefaultValidation = {
    NameValidation: {error: '', validated: true},
    EmailValidation: {error: '', validated: true},
    PasswordValidation: {error: '', validated: true},
    passwordMatch: true,
    AllCorrect: true
}

const DefaultInput = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}


export default function Register() {
    const [data, setData] = useState(DefaultInput);
    const [Validations, setErrors] = useState(DefaultValidation);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/main')
        }
    }, [])

    function handleData(event) {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }
    
    function handleValidation() {
        const {name, email, password, confirmPassword} = data;
        setErrors(DefaultValidation);
        const NameResult = Boolean(String(name).length >= 5);
        const EmailResult = Boolean(String(email).toLowerCase().match(EmailRE));
        const PasswordResult = Boolean(String(password).length >= 5);
        const PasswordMatchResult = Boolean(confirmPassword === password);
        
        if (!NameResult) {
            setErrors(prev => ({...prev, AllCorrect: false, NameValidation: {...prev.NameValidation, error: "Invalid Name", validated: false}}))
        }
        else if (!EmailResult) {
            setErrors(prev => ({...prev, AllCorrect: false, EmailValidation: {...prev.EmailValidation, error: "Invalid Email", validated: false}}))

        }
        else if (!PasswordResult) {
            setErrors(prev => ({...prev, AllCorrect: false, PasswordValidation: {...prev.PasswordValidation, error: "Minimum Character allowed is 5", validated: false}}))

        }
        else if (!PasswordMatchResult) {
            setErrors(prev => ({...prev, AllCorrect: false, passwordMatch: false}))
        }
        else {
            OnSubmit();
        }


    }
    
    function OnSubmit(e) {
        fetch('/api/auth/register', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
              }
        })
        .then(res => res.json())
        .then(res => {
            console.log('wotthis');
            console.log(res);
            if (res.token) {
                console.log('yesssss');
                localStorage.setItem('token', res.token);
                localStorage.setItem('email', data.email);
                localStorage.setItem('username', data.username);
                //localStorage.setItem('uuid', res.uuid);
                setData(DefaultInput);
                navigate("/main");

            } else {
                window.location.reload();
                
            }
        });
    }        
    

    return (
        <div style={divContent}>


            <TextField
                label="UserName"
                variant="outlined"
                value={data.username}
                style={InputCSS}
                name="username"
                onChange={handleData}
                error={!Validations.NameValidation.validated}
                helperText={Validations.NameValidation.error}
            />

            <TextField
                label="Email"
                variant="outlined"
                value={data.email}
                style={InputCSS}
                name="email"
                type="email"
                onChange={handleData}
                error={!Validations.EmailValidation.validated}
                helperText={Validations.EmailValidation.error}
            />

            <TextField
                label="Password"
                name="password"
                variant="outlined"
                type="password"
                value={data.password}
                onChange={handleData}
                style={InputCSS}
                error={!Validations.PasswordValidation.validated}
                helperText={Validations.PasswordValidation.error}
            />

            <TextField
                label="Confirm Password"
                name="confirmPassword"
                variant="outlined"
                type="password"
                value={FormData.confirmPassword}
                onChange={handleData}
                style={InputCSS}
                error={!Validations.passwordMatch}
                helperText={Validations.passwordMatch ? null : "Your Password does not match"}
            />

            <Button onClick={OnSubmit} variant="contained">Register</Button>

        </div>
    )
}
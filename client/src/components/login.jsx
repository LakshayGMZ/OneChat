import { Button, Link, TextField } from "@mui/material";
import { Paper, Divider, Chip, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import React, { ReactDOM, useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";

const InputCSS = {
    display: "flex",
    margin: "17px 20px",

}

const otherLoginMethods = {
    margin: "2rem 2rem",
    fontSize: "1.1rem"

}

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


function Login() {
    const [FormData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/main')
        }
    }, [])

    function HandleData(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    function OnSubmit(event) {
        event.preventDefault();
        fetch('/api/auth/login', {
            method: "POST",
            body: JSON.stringify(FormData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('res came');
                console.log(res);
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('email', res.email);
                    localStorage.setItem('username', res.username);
                    localStorage.setItem('uuid', res.uuid);
                    setFormData({ email: '', password: '' });
                    navigate("/main");

                } else {
                    console.log('reload');
                    window.location.reload();

                }
            });
    }

    return (

        <Paper elevation={24}>
            <div style={divContent}>
                <Grid container>

                    <Grid item>
                        <div>

                            <TextField
                                label="Email"
                                name="email"
                                value={FormData.email}
                                onChange={HandleData}
                                variant="outlined"
                                type="email"
                                style={InputCSS}
                            />

                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={FormData.password}
                                onChange={HandleData}
                                style={InputCSS}
                            />

                            <Button onClick={OnSubmit} variant="contained" colour="red">Login</Button>
                        </div>
                    </Grid>

                    <Divider orientation="vertical"
                        style={{ margin: "1.7rem 0" }}
                        flexItem>
                        <Chip label="OR" />
                    </Divider>

                    <Grid item style={{ textAlign: "left" }}>
                        <Button variant="contained"
                            href="/register"
                            style={otherLoginMethods}
                            startIcon={<HowToRegIcon fontSize="large" />}>
                            Register
                        </Button>
                        <br />
                        <Button variant="contained"
                            style={otherLoginMethods}
                            startIcon={<GoogleIcon fontSize="large" />}>
                            Login with Google
                        </Button>
                        <br />
                        <Button variant="contained"
                            style={otherLoginMethods}
                            startIcon={<FacebookIcon fontSize="large" />}>
                            Login with Facebook
                        </Button>
                    </Grid>
                </Grid>

            </div>
        </Paper>

    )
}

export default Login;
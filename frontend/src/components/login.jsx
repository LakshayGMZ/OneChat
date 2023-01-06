import { Button, Link, TextField } from "@mui/material";
import { Paper, Divider, Chip, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import React, { ReactDOM, useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../stylesheets/login.css"




function Login() {
    const [FormData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/app')
        }
    }, [])

    function HandleData(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    function OnSubmit(event) {
        event.preventDefault();
        axios.post('/api/auth/login', FormData)
            .then(res => res.data)
            .then(res => {
                console.log('res came');
                console.log(res);
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('email', res.email);
                    localStorage.setItem('username', res.username);
                    localStorage.setItem('uuid', res.uuid);
                    setFormData({ email: '', password: '' });
                    navigate("/app");

                } else {
                    console.log('reload');
                    window.location.reload();

                }
            })
            .catch((error) => {
                console.log(error);
            });;
    }

    return (

        <Paper elevation={24}>
            <div className="containerLogin">
                <Grid container>

                    <Grid item>
                        <div style={{display: "flex", flexDirection: "column"}}>

                            <TextField
                                label="Email"
                                name="email"
                                value={FormData.email}
                                onChange={HandleData}
                                variant="outlined"
                                type="email"
                                className="InputBox"
                            />

                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={FormData.password}
                                onChange={HandleData}
                                className="InputBox"
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
                            className="otherLoginMethods"
                            startIcon={<HowToRegIcon fontSize="large" />}>
                            Register
                        </Button>
                        <br />
                        <Button variant="contained"
                            className="otherLoginMethods"
                            startIcon={<GoogleIcon fontSize="large" />}>
                            Login with Google
                        </Button>
                        <br />
                        <Button variant="contained"
                            className="otherLoginMethods"
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
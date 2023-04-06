import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SocketContext, socket } from './websockets/socket';
import Login from './components/login'
import Register from './components/register'
import MainApp from './components/app/mainapp';
import axios from 'axios'

import "./stylesheets/index.css"

function App() {
    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

    axios.interceptors.request.use(config => {
        config.headers.Authorization = localStorage.token || '';
        return config;
    }, error => Promise.reject(error));


    return (
        <SocketContext.Provider value={socket}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="app" element={<MainApp />} />
                </Routes>
            </BrowserRouter>
        </SocketContext.Provider>
    )
}

export default App;

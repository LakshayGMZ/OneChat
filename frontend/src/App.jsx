import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login'
import Register from './components/register'
import MainApp from './components/app/mainapp';
import axios from 'axios'

import "./stylesheets/index.css"

function App() {

  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  axios.defaults.headers.common['Authorization'] = localStorage.token;
  //axios.defaults.baseURL = "";


  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="app" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

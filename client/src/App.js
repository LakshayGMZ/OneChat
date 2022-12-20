import logo from './logo.svg';
import { dividerClasses } from '@mui/material';
import Login from './components/login';
import Register from './components/register';
import Main from './components/main/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login />}/>
          <Route path="register" element={<Register />} />
          <Route path="main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

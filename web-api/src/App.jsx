import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Login from './components/Login'; 
import Productos from './components/Productos';

function App() {
  return (
    <>
        <NavBar />
        <Routes>
          <Route path='/productos' element={<Productos />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to="/productos" />} />
        </Routes>
    </>
  );
}

export default App;
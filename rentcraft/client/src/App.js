// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
import WelcomeIndex from './components/main-section/WelcomeIndex';
import MainHeader from './components/header-section/MainHeader';
import NavBar from './components/navigation-section/NavBar';
import Auth from './components/authorization-section/Auth';

function App() {
  const [token, setToken] = useState("");
  const [currentId, setCurrentId] = useState("");

  // Set Token
  function updateToken(newToken) {
    setToken(newToken)
    localStorage.setItem("token", newToken)
  }

  // Clear Token
  const clearToken = () => {
    localStorage.clear()
    setToken("")
  }

  // Update ID
  function updateCurrentId(newCurrentId) {
    setCurrentId(newCurrentId)
    localStorage.setItem("currentId", newCurrentId)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) { setToken(token) }
  }, []);

  useEffect(() => {
    const currentId = localStorage.getItem("currentId")
    if (currentId) { setCurrentId(currentId) }
  }, []);

  return (
    <div className='app-container'>
      <MainHeader token={token} currentId={currentId} />
      <NavBar token={token} currentId={currentId} clickLogout={clearToken} />
      <Routes>
        <Route 
        path='/'
        element={<WelcomeIndex token={token} currentId={currentId} />}
        />

        <Route 
        path='/auth'
        element={<Auth updateToken={updateToken} updateCurrentId={updateCurrentId} />}
        />
      </Routes>
    </div>
  );
}

export default App;

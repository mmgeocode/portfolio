import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Auth from './components/authorization-section/Auth'
import MainHeader from './components/header-section/MainHeader'
import NavigationBar from './components/navigation-section/NavigationBar';
import WelcomeIndex from './components/main-section/WelcomeIndex';
import MainIndex from './components/main-section/MainIndex';
import RoomView from './components/main-section/RoomView';
import ProfileView from './components/main-section/ProfileView';

function App() {
  const [token, setToken] = useState("")
  const [currentId, setCurrentId] = useState("");

  const clearToken = () => {
    localStorage.clear()
    setToken("")
  }

  function updateToken(newToken) {
    setToken(newToken)
    localStorage.setItem("token", newToken)
  }

  function updateCurrentId(newCurrentId) {
    setCurrentId(newCurrentId)
    localStorage.setItem("CurrentId", newCurrentId)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      setToken(token)
    }

  }, [])

  useEffect(() => {
    const currentId = localStorage.getItem("CurrentId");

    if (currentId) {
      setCurrentId(currentId)
    }

  }, []);

  return (
    <div>
      <MainHeader token={token} currentId={currentId} />
      <NavigationBar token={token} currentId={currentId} clickLogout={clearToken} />
      <Routes>
        <Route path='/' element={<WelcomeIndex token={token} currentId={currentId} />} />
        <Route path='/auth' element={<Auth updateToken={updateToken} updateCurrentId={updateCurrentId} /> } />
        <Route path='/feed/:id' element={<MainIndex token={token} currentId={currentId} />} />
        <Route path='/user/:id' element={<ProfileView token={token} currentId={currentId} />} />
        <Route path='/message/room/:id' element={<RoomView token={token} currentId={currentId} />} />
      </Routes>
    </div>
  );
}

export default App;

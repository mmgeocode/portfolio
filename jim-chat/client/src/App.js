import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Auth from './components/authorization-section/Auth'
import MainHeader from './components/header-section/MainHeader'
import NavigationBar from './components/navigation-section/NavigationBar';
import MainIndex from './components/main-section/MainIndex';

function App() {
  const [token, setToken] = useState("")

  function updateToken(newToken) {
    setToken(newToken)
    localStorage.setItem("token", newToken)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      setToken(token)
    }

  }, [])

  return (
    <div>
      <MainHeader />
      <NavigationBar />
      <Routes>
        <Route path='/auth' element={<Auth updateToken={updateToken} /> } />
        <Route path='/feed' element={<MainIndex token={token} />} />
      </Routes>
    </div>
  );
}

export default App;

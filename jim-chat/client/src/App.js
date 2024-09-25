import logo from './logo.svg';
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Auth from './components/authorization-section/Auth'
import MainHeader from './components/header-section/MainHeader'
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
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <div>
      <MainHeader />
      <Routes>
        <Route path='/feed' element={<MainIndex token={token} />} />
      </Routes>
    </div>
  );
}

export default App;

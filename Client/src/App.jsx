import React from 'react'
import { Routes, Route, NavLink } from "react-router-dom";
import Navbar from './component/Navbar'
import LoginPage from './page/LoginPage'
import HomePage from './page/HomePage'
const App = () => {
  return (
    <div>
      {/* <LoginPage/> */}
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </div>
  )
}

export default App

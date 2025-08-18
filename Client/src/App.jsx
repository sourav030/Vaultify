import React, { useEffect } from 'react'
import { Routes, Route, NavLink } from "react-router-dom";
import Navbar from './component/Navbar'
import LoginPage from './page/LoginPage'
import HomePage from './page/HomePage'
import DepositMoney from './page/DepositMoney';
import { BankContext } from './context/Context';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from 'react';
const App = () => {
  
  const {token,setToken,accoutId,setAccountId}=useContext(BankContext)
  useEffect(()=>{
    setToken(localStorage.getItem('token'))
  },[])


  return (
    <div>
      <Navbar />
      {
        !token ?
          <LoginPage /> :
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/Deposit-Money" element={<DepositMoney />} />
          </Routes>
      }

      <ToastContainer 
        position="top-right"   // top-right, top-center, bottom-right, etc.
        autoClose={3000}       // 3 seconds ke baad close hoga
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"        // light, dark, colored
      />

    </div>
  )
}

export default App

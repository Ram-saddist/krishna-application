import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './Login/Login'
import Navigation from './Navigation/Navigation'
import Home from './Home/Home'
import Register from './Register/Register'
import ManageAppointments from './ManageAppointments/ManageAppointments'

export default function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/manage-appointments' element={<ManageAppointments/>}/>
      </Routes>
    </BrowserRouter>
  )
}

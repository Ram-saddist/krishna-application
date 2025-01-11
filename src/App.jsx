import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './Login/Login'
import Navigation from './Navigation/Navigation'
import Home from './Home/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/register'/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

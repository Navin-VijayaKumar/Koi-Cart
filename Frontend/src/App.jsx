import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Cart from './Pages/Cart/Cart'
import Buy from './Pages/Buy/Buy'
import About from './Pages/About/About'
import Scape from './Pages/Scape/Scape'
function App() {

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart></Cart>} />
        <Route path='/buy' element={<Buy />} />
        <Route path='/about' element={<About></About>} />
        <Route path='/scape' element={<Scape></Scape>} />
      </Routes>
    </>
  )
}

export default App

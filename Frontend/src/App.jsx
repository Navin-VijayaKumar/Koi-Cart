import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Cart from './Pages/Cart/Cart'
import Buy from './Pages/Buy/Buy'
import About from './Pages/About/About'
import Scape from './Pages/Scape/Scape'
import Footer from './Components/Footer/Footer'
import Contact from './Pages/Contact/Contact'
import InnerDisplay from './Components/InnerDisplay/InnerDisplay'
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
        <Route path='/contact' element={<Contact></Contact>} />
        <Route path='/product/:productID' element={<InnerDisplay></InnerDisplay>} />
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App

import React from 'react'
import './Home.css'
import Slider from '../Slider/Slider'
import TopSelling from '../TopSelling/TopSelling'
const Home = () => {
  return (
    <div>
        <Slider></Slider>
        <TopSelling></TopSelling>
    </div>
  )
}

export default Home
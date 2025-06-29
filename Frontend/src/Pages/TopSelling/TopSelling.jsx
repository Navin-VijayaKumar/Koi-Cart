import React from 'react'
import './TopSelling.css'
import RelatedProduct from '../../Components/RelatedProduct/RelatedProduct'
const TopSelling = () => {
  return (
    <div className="topselling-con">
  <h3>
     <span>Top Selling Fishs</span>
  </h3>
  <RelatedProduct></RelatedProduct>
</div>

  )
}

export default TopSelling
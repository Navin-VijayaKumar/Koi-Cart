import React from 'react'
import './Scape.css'
import koivid from '../PageAssets/koivid.mp4'
const Scape = () => {
  return (
    <div className="scape-con">
      <h3>
        <span>AQUA SCAPE</span>

      </h3>
<div className="redirect">

      <div className="bg-video1">
        <video autoPlay loop muted playsInline className="video-background">
          <source src={koivid} type="video/mp4" className='bg-video' />
        </video>
      </div>
      <div className="web-con">
            <div className="scape-construction">
              <div className="">

              <h4>Aqua Scape Construction</h4>
              </div>
              <div className="">

              <p>Discover the beauty and tranquility of underwater landscapes. At AquaScape Haven, we bring your aquatic visions to life with stunning aquascaping designs that mimic nature’s harmony. Whether you're a beginner or a seasoned enthusiast, our curated aquariums, plants, substrates, and accessories help you create captivating aquatic ecosystems.
              </p>
              </div>
            </div>
              <a href="https://nextscape.vercel.app/" target="_blank" rel="noopener noreferrer">
            <div className="redirect-web">
              <h4>View Site</h4>
              <div className="re-icon">

                        &#10095;
              </div>

                  
            </div></a>
      </div>
</div>
    </div>
  )
}

export default Scape
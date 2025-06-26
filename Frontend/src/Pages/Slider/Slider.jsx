import React, { useState, useEffect } from "react";
import "./Slider.css";
import a1 from '../PageAssets/a1.png'
//  import  from "../AssertsPage/nsslider2.png";
//  import  from "../AssertsPage/nsslider3.png";
//  import  from "../AssertsPage/nsslider4.png";
//  import  from "../AssertsPage/nsslider5.png";
//  import  from "../AssertsPage/nsslider1.mp4"; // Ensure this is a video file

const media = [
  { type: "video", src: a1 },
  { type: "image", src: a1},
  { type: "image", src: a1 },
  { type: "image", src: a1 },
  { type: "image", src:a1 },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3450);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="imageslider1">
      <div className="carousel1">
        <div className="carousel-container1">
          {media[currentIndex].type === "image" ? (
            <img
              src={media[currentIndex].src}
              alt={`Slide ${currentIndex + 1}`}
              className="carousel-image1"
            />
          ) : (
            <video
              src={media[currentIndex].src}
              className="carousel-image1"
              autoPlay
              muted
              loop
            />
          )}
        </div>
        <button className="prev1" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="next1" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Slider;
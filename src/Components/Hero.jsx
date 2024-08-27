
import React, { useState, useEffect } from 'react';


const Hero = () => {
const [currentIndex, setCurrentIndex] = useState(0);
const images = [
    '/c1.png',
    '/c2.jpg',
    '/c3.jpg',
]

useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }, 3000);

    return () => clearInterval(interval);
    }, [images.length]);

return (
    <div className="hero-carousel">
    <div className="carousel-wrapper">
        <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="carousel-image"
        />
    </div>
    </div>
);
};

export default Hero;

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { carousel } from "../constants";

const HotelCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === carousel.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? carousel.length - 1 : prev - 1));
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="relative w-full flex items-center justify-center">
        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="
            absolute left-0 z-20
            w-10 h-10 rounded-full
            bg-[#111923]/80
            border border-white/10
            backdrop-blur-md
            flex items-center justify-center
            text-white
            hover:bg-[#1B2A38]
            transition-all duration-300
          "
        >
          <IoChevronBack size={20} />
        </button>

        {/* Wrapper */}
        <div className="relative">
          {/* Gradient Glow */}
          <div
            className="
              pointer-events-none
              absolute top-20 right-20
              h-65 w-100
              bg-linear-to-br
              from-[#7FAEBB]
              to-[#2abde6]
              blur-[90px]
              opacity-80
              z-0
            "
          />

          {/* Carousel Image */}
          <div
            className="
              relative overflow-hidden
              rounded-[30px]
              border border-white/10
              w-180 h-100
              z-10
            "
          >
            <Image
              src={carousel[currentIndex]}
              alt="Hotel UI"
              fill
              priority
              className="object-cover transition-all duration-500"
            />
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="
            absolute right-0 z-20
            w-10 h-10 rounded-full
            bg-[#111923]/80
            border border-white/10
            backdrop-blur-md
            flex items-center justify-center
            text-white
            hover:bg-[#1B2A38]
            transition-all duration-300
          "
        >
          <IoChevronForward size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-3 mt-8">
        {carousel.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              transition-all duration-300 rounded-full
              ${
                currentIndex === index
                  ? "w-8 h-2 bg-[#3CCFE8]"
                  : "w-2 h-2 bg-white/30 hover:bg-white/50"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelCarousel;

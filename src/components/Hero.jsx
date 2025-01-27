"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import gsap from "gsap";

// Debounce function to limit the frequency of mouse move events
const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Custom hook to track mouse position with debouncing
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    const updateMousePosition = debounce((e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }, 16); // ~60fps

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

export default function Home() {
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const { x, y } = useMousePosition();
  const size = isMouseMoving ? 250 : 100;

  const images = [
    "img/Hero3.jpg",
    "img/Hero5.jpg",
    "img/Hero1.jpg",
    "img/Hero2.jpg",
    "img/Hero4.jpg",
    "img/Hero6.jpg",
  ];

  const maskRef = useRef(null);
  const currentIndexRef = useRef(currentIndex);
  const isUpdatedRef = useRef(false);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const handleMouseMove = debounce(() => {
      setIsMouseMoving(true);
      setTimeout(() => setIsMouseMoving(false), 100);
    }, 16);

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClick = useCallback(() => {
    if (!maskRef.current) return;

    isUpdatedRef.current = false;

    const animation = gsap.to(maskRef.current, {
      maskSize: "150%",
      WebkitMaskPosition: "center",
      duration: 1, // Reduced duration
      ease: "power1.inOut",
      onUpdate: () => {
        const progress = animation.progress();
        if (progress > 0.7 && !isUpdatedRef.current) {
          const newIndex = (currentIndexRef.current + 1) % images.length;
          setCurrentIndex(newIndex);
          currentIndexRef.current = newIndex;
          isUpdatedRef.current = true;
        }
      },
      onComplete: () => {
        setNextIndex((prevIndex) => (prevIndex + 1) % images.length);
        gsap.set(maskRef.current, {
          maskSize: `${size}px`,
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
        });
      },
    });
  }, [images.length, size, x, y]);

  return (
    <main
      className="h-screen relative flex items-center justify-center z-10 bg-white overflow-hidden"
      onClick={handleClick}
    >
      <motion.div
        ref={maskRef}
        className="absolute w-full h-full flex items-center justify-center cursor-default"
        style={{
          maskImage: "url('img/mask.svg')",
          maskRepeat: "no-repeat",
          maskSize: `${size}px`,
          backgroundColor: "#ec4e39",
        }}
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }} // Reduced duration
      >
        <div className="w-full h-full">
          <img
            src={images[nextIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </motion.div>

      <div className="w-full h-full flex items-center justify-center cursor-default">
        <div className="w-full h-full">
          <img
            src={images[currentIndex]}
            alt={`Image ${((currentIndex + 1) % images.length) + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <h1 className="font-futura-hv hero-heading absolute bottom-5 right-5 z-40 text-berkut-skin">
        TRAVEL
      </h1>

      <div className="absolute left-0 top-0 z-40 size-full">
        <div className="mt-24 px-5 sm:px-10">
          <h1 className="font-futura-hv hero-heading text-berkut-dark">
            REDEFINE
          </h1>

          <p className="mb-5 max-w-100 font-robert-regular text-berkut-skin">
            Small group adventures that bring you the moments only Intrepid can
            offer.
            <br />
            Only here. Only now. Only Berkut.
          </p>

          <Button
            id="watch-trailer"
            title="Know More"
            leftIcon={<TiLocationArrow />}
            containerClass="bg-berkut-tint flex-center gap-1 !bg-berkut-tint"
          />
        </div>
      </div>
    </main>
  );
}

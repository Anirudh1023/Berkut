"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import gsap from "gsap";

// Custom hook to track mouse position with throttling
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    let animationFrameId;

    const updateMousePosition = (e) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return mousePosition;
};

export default function Home() {
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current image index
  const [nextIndex, setNextIndex] = useState(1);
  const { x, y } = useMousePosition();
  const size = isMouseMoving ? 250 : 100; // Large when moving, small when stationary

  // Define the images array
  const images = [
    "img/Hero3.jpg",
    "img/Hero5.jpg",
    "img/Hero1.jpg",
    "img/Hero2.jpg",
    "img/Hero4.jpg",
    "img/Hero6.jpg",
  ];

  // Ref for the mask element
  const maskRef = useRef(null);

  // Ref to track currentIndex independently of React state
  const currentIndexRef = useRef(currentIndex);
  useEffect(() => {
    currentIndexRef.current = currentIndex; // Sync ref with state
  }, [currentIndex]);

  // Flag to prevent multiple updates
  const isUpdatedRef = useRef(false);

  // Track mouse movement with debouncing
  useEffect(() => {
    let movementTimer;

    const handleMouseMove = () => {
      setIsMouseMoving(true); // Mouse is moving
      clearTimeout(movementTimer);

      // Set a timeout to detect when the mouse stops moving
      movementTimer = setTimeout(() => {
        setIsMouseMoving(false); // Mouse has stopped moving
      }, 100); // Adjust the delay as needed
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(movementTimer);
    };
  }, []);

  // Handle click to cycle through images with GSAP animation
  const handleClick = () => {
    if (!maskRef.current) return; // Ensure the ref exists

    // Reset the flag
    isUpdatedRef.current = false;

    const animation = gsap.to(maskRef.current, {
      maskSize: "150%",
      WebkitMaskPosition: "center",
      duration: 2,
      ease: "power1.inOut",
      onUpdate: () => {
        // Access the progress of the animation
        const progress = animation.progress();
        if (progress > 0.7 && !isUpdatedRef.current) {
          // Update currentIndex using the ref
          const newIndex = (currentIndexRef.current + 1) % images.length;
          setCurrentIndex(newIndex); // Update state
          currentIndexRef.current = newIndex; // Update ref
          isUpdatedRef.current = true; // Set the flag to prevent further updates
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
  };

  return (
    <main
      className="h-screen relative flex items-center justify-center z-10 bg-white overflow-hidden"
      onClick={handleClick} // Click to cycle images
    >
      {/* Mask Section */}
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
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <div className="w-full h-full">
          <img
            src={images[nextIndex]} // Current image
            alt={`Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            loading="lazy" // Lazy load images
          />
        </div>
      </motion.div>

      {/* Body Section */}
      <div className="w-full h-full flex items-center justify-center cursor-default">
        <div className="w-full h-full">
          <img
            src={images[currentIndex]} // Next image in the cycle
            alt={`Image ${((currentIndex + 1) % images.length) + 1}`}
            className="w-full h-full object-cover"
            loading="lazy" // Lazy load images
          />
        </div>
      </div>

      {/* Text and Button Elements */}
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
            Only here. Only now. Only Intrepid.
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

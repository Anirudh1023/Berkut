import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button"; // Assuming you have a Button component

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const imageRef = useRef(null);

  const carouselItems = [
    {
      image: "/img/Hero1.jpg",
      text: "Explore the World with Berkut",
    },
    {
      image: "/img/Hero2.jpg",
      text: "Discover Hidden Gems",
    },
    {
      image: "/img/Hero3.jpg",
      text: "Experience Unique Adventures",
    },
  ];

  const nextCarousel = () => {
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
        gsap.fromTo(
          imageRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.inOut" }
        );
      },
    });
  };

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "top center", // Adjust the start position
        end: "bottom center", // Adjust the end position
        scrub: 1, // Increase scrub value for smoother transitions
        pin: true,
        pinSpacing: true,
        markers: false, // Set to true for debugging
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      ease: "power2.inOut", // Add easing for smoother transitions
      duration: 2, // Increase duration for smoother transitions
    });
  });

  return (
    <div
      id="about"
      className="relative min-h-screen w-screen z-10 bg-berkut-light"
    >
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font text-sm uppercase md:text-[10px] text-berkut-dark">
          Welcome to Berkut
        </p>

        <AnimatedTitle
          title="Y'S OF EXPERIENCES OVER X'S OF COUNTRIES"
          containerClass="mt-5 !text-berkut-tint text-center"
        />

        <div className="about-subtext">
          <p>
            Small group adventures that bring you the moments only Berkut can
            offer.
          </p>
          <p className="text-gray-500">Only here. Only now. Only Berkut.</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image" ref={carouselRef}>
          <img
            ref={imageRef}
            key={currentIndex} // Add key prop to force re-render
            src={carouselItems[currentIndex].image}
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
          <div className="absolute top-20 left-20 text-berkut-skin font-futura-hv md:text-8xl text-3xl">
            {carouselItems[currentIndex].text}
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 right-5 flex gap-2">
        <Button
          id="next-carousel"
          title="Next"
          onClick={nextCarousel}
          containerClass="bg-berkut-tint flex-center gap-1 z-20 !bg-berkut-tint"
        />
        <Button
          id="watch-trailer"
          title="Know More"
          leftIcon={<TiLocationArrow />}
          containerClass="bg-berkut-tint flex-center gap-1 z-20 !bg-berkut-light"
        />
      </div>
    </div>
  );
};

export default About;

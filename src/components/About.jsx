import React, { useRef, useState, memo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const About = memo(() => {
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
      will: "transform opacity",
      onComplete: () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
        gsap.fromTo(
          imageRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.inOut",
            will: "transform opacity",
          }
        );
      },
    });
  };

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });
    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      ease: "power2.inOut",
      duration: 2,
      will: "transform width height",
    });
  });

  return (
    <div
      id="about"
      className="relative min-h-screen w-screen z-10 bg-berkut-light will-change-transform will-change-scroll will-change-opacity"
    >
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5 will-change-transform">
        <p className="font text-sm uppercase md:text-[10px] text-berkut-dark will-change-opacity">
          Welcome to Berkut
        </p>
        <AnimatedTitle
          title="Y'S OF EXPERIENCES OVER X'S OF COUNTRIES"
          containerClass="mt-5 !text-berkut-tint text-center will-change-transform"
        />
        <div className="about-subtext will-change-transform">
          <p>
            Small group adventures that bring you the moments only Berkut can
            offer.
          </p>
          <p className="text-gray-500">Only here. Only now. Only Berkut.</p>
        </div>
      </div>
      <div className="h-dvh w-screen will-change-transform" id="clip">
        <div
          className="mask-clip-path about-image will-change-transform"
          ref={carouselRef}
        >
          <img
            ref={imageRef}
            key={currentIndex}
            src={carouselItems[currentIndex].image}
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover will-change-transform"
            loading="lazy"
          />
          <div className="absolute top-20 left-20 text-berkut-skin font-futura-hv md:text-8xl text-3xl will-change-transform">
            {carouselItems[currentIndex].text}
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 right-5 flex gap-2 will-change-transform">
        <Button
          id="next-carousel"
          title="Next"
          onClick={nextCarousel}
          containerClass="bg-berkut-tint flex-center gap-1 z-20 !bg-berkut-tint will-change-transform"
        />
        <Button
          id="watch-trailer"
          title="Know More"
          leftIcon={<TiLocationArrow />}
          containerClass="bg-berkut-tint flex-center gap-1 z-20 !bg-berkut-light will-change-transform"
        />
      </div>
    </div>
  );
});

export default About;

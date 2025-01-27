import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
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

  // Preload images to prevent layout shifts
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = carouselItems.map((item) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = item.image;
          img.onload = resolve;
        });
      });

      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };

    preloadImages();
  }, []);

  const nextCarousel = () => {
    if (!imagesLoaded) return;

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
    if (!imagesLoaded) return;

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
    });
  }, [imagesLoaded]); // Only run animation after images are loaded

  return (
    <div
      id="about"
      className="relative min-h-screen w-screen z-10 bg-berkut-light"
    >
      {/* Header Section with font-display optimization */}
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p
          className="font text-sm uppercase md:text-[10px] text-berkut-dark"
          style={{ fontDisplay: "swap" }}
        >
          Welcome to Berkut
        </p>

        <AnimatedTitle
          title="Y'S OF EXPERIENCES OVER X'S OF COUNTRIES"
          containerClass="mt-5 !text-berkut-tint text-center"
        />

        <div className="about-subtext">
          <p style={{ fontDisplay: "swap" }}>
            Small group adventures that bring you the moments only Berkut can
            offer.
          </p>
          <p className="text-gray-500" style={{ fontDisplay: "swap" }}>
            Only here. Only now. Only Berkut.
          </p>
        </div>
      </div>

      {/* Image Carousel Section with proper aspect ratio and loading optimization */}
      <div className="h-dvh w-screen" id="clip">
        <div
          className="mask-clip-path about-image"
          ref={carouselRef}
          style={{ aspectRatio: "16/9" }}
        >
          {imagesLoaded && (
            <>
              <img
                ref={imageRef}
                key={currentIndex}
                src={carouselItems[currentIndex].image}
                alt={carouselItems[currentIndex].text}
                width={1920}
                height={1080}
                className="absolute left-0 top-0 size-full object-cover"
                loading="eager" // Load first image eagerly for LCP
              />
              <div
                className="absolute top-20 left-20 text-berkut-skin font-futura-hv md:text-8xl text-3xl"
                style={{ fontDisplay: "swap" }}
              >
                {carouselItems[currentIndex].text}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Buttons Section */}
      <div className="absolute bottom-5 right-5 flex gap-2">
        <Button
          id="next-carousel"
          title="Next"
          onClick={nextCarousel}
          containerClass="bg-berkut-tint flex-center gap-1 z-20 !bg-berkut-tint"
          disabled={!imagesLoaded}
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

import { gsap } from "gsap";
import { useEffect, useRef, memo } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = memo(({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 100%", // Adjust the start position
          end: "bottom 20%", // Adjust the end position
          toggleActions: "play none none reverse",
          scrub: 1, // Add scrub for smoother transitions
          markers: false, // Set to true for debugging
        },
      });

      titleAnimation.fromTo(
        ".animated-word",
        {
          opacity: 0,
          y: 20, // Start slightly below
          rotateX: 90, // Start rotated
          rotateY: 20, // Start rotated
        },
        {
          opacity: 1,
          y: 0, // Move to original position
          rotateX: 0, // Reset rotation
          rotateY: 0, // Reset rotation
          ease: "power2.out", // Smoother easing
          stagger: 0.02, // Stagger animation
          duration: 0.5, // Increase duration for smoother transitions
          willChange: "transform, opacity", // Use will-change sparingly
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={clsx("animated-title will-change-transform", containerClass)}
    >
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3 font-general md:text-7xl text-3xl"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word inline-block will-change-transform"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
});

export default AnimatedTitle;

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
          start: "top bottom",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.fromTo(
        ".animated-word",
        {
          opacity: 0,
          y: 50, // Start slightly below original position
          rotateX: 45, // Add initial rotation
        },
        {
          opacity: 1,
          y: 0, // Animate to original position
          rotateX: 0,
          transform: "translate3d(0, 0, 0) rotateY(0deg)",
          ease: "power2.out",
          stagger: 0.05, // Slightly increased stagger for smoother effect
          duration: 0.6, // Added duration for more controlled animation
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "absolute bottom-20 left-0 w-full z-20 text-center",
        containerClass
      )}
    >
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3 font-general md:text-7xl text-3xl text-white"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word inline-block opacity-0 will-change-transform"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
});

export default AnimatedTitle;

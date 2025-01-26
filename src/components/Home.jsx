import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const artbackRef = useRef(null);
  const mountainRef = useRef(null);
  const logolandRef = useRef(null);
  const jungle1Ref = useRef(null);
  const jungle2Ref = useRef(null);
  const jungle3Ref = useRef(null);
  const jungle4Ref = useRef(null);
  const manonmountainRef = useRef(null);
  const jungle5Ref = useRef(null);

  useEffect(() => {
    const layers = [
      { ref: artbackRef, speed: 0.25 },
      { ref: mountainRef, speed: 0.3 },
      { ref: logolandRef, speed: 0.2 },
      { ref: jungle1Ref, speed: 0.3 },
      { ref: jungle2Ref, speed: 0.35 },
      { ref: jungle3Ref, speed: 0.5 },
      { ref: jungle4Ref, speed: 0.45 },
      { ref: manonmountainRef, speed: 0.4 },
      { ref: jungle5Ref, speed: 0.35 },
    ];

    layers.forEach(({ ref, speed }) => {
      if (ref.current) {
        gsap.to(ref.current, {
          y: () => speed * ScrollTrigger.maxScroll(window) * -1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5, // Reduced scrub value for smoother performance
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen w-screen">
      <div className="animation">
        {[
          { ref: artbackRef, id: "artback" },
          { ref: mountainRef, id: "mountain" },
          { ref: jungle1Ref, id: "jungle1" },
          { ref: jungle2Ref, id: "jungle2" },
          { ref: jungle3Ref, id: "jungle3" },
          { ref: logolandRef, id: "logoland" },
          { ref: jungle4Ref, id: "jungle4" },
          { ref: manonmountainRef, id: "manonmountain" },
          { ref: jungle5Ref, id: "jungle5" },
        ].map(({ ref, id }) => (
          <div
            key={id}
            ref={ref}
            className="animation_layer parallax"
            id={id}
            style={{ willChange: "transform" }} // Promote to GPU layer
          ></div>
        ))}
      </div>
    </div>
  );
};

export default App;

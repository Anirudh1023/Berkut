import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const scrollRef = useRef(0);
  const layers = [
    { id: "artback", speed: 0.25, imagePath: "/images/background.png" },
    { id: "mountain", speed: 0.3, imagePath: "/images/mountains.png" },
    { id: "logoland", speed: 0.2, imagePath: "/images/Transparent.png" },
    { id: "jungle1", speed: 0.3, imagePath: "/images/jungle1.png" },
    { id: "jungle2", speed: 0.35, imagePath: "/images/jungle2.png" },
    { id: "jungle3", speed: 0.5, imagePath: "/images/jungle3.png" },
    { id: "jungle4", speed: 0.45, imagePath: "/images/jungle4.png" },
    {
      id: "manonmountain",
      speed: 0.4,
      imagePath: "/images/man_on_mountain.png",
    },
    { id: "jungle5", speed: 0.35, imagePath: "/images/jungle5.png" },
  ];

  // Preload images to improve LCP
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = layers.map((layer) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = layer.imagePath;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error("Error preloading images:", error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    let prevScrollY = window.scrollY;
    const layerElements = layers.map(({ id }) => ({
      element: document.getElementById(id),
      transform: 0,
    }));

    const animate = () => {
      const currentScrollY = window.scrollY;

      if (prevScrollY !== currentScrollY) {
        layerElements.forEach((layer, index) => {
          if (layer.element) {
            layer.transform = -(currentScrollY * layers[index].speed);
            layer.element.style.transform = `translate3d(0, ${layer.transform}px, 0)`;
          }
        });
        prevScrollY = currentScrollY;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoading]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-screen overflow-hidden"
      style={{ visibility: isLoading ? "hidden" : "visible" }}
    >
      <div className="animation">
        {layers.map(({ id, imagePath }) => (
          <div
            key={id}
            id={id}
            className="fixed top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url(${imagePath})`,
              backgroundPosition: "bottom center",
              backgroundSize: "auto 1038px",
              backgroundRepeat: "repeat-x",
              willChange: "transform",
              transform: "translate3d(0, 0, 0)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

import React from "react";
import Home from "./components/Home";
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Blogs from "./components/Blogs";
import { ReactLenis } from "lenis/react";

const App = () => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // Adjust this value for smoother scrolling (0.1 is very smooth)
        smoothWheel: true, // Enable smooth scrolling for mouse wheel
        smoothTouch: true, // Enable smooth scrolling on touch devices
        duration: 2.5, // Adjust the duration of the scroll animation
        touchMultiplier: 1.5, // Adjust scrolling speed on touch devices
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      }}
    >
      <main className="relative min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-berkut-light">
        {/* <div className="hidden md:block"> */}
        <Home />
        {/* </div> */}
        <Navbar />
        <Hero />
        <About />
        <Features />
        <Blogs />
        <Contact />
        <Footer />
      </main>
    </ReactLenis>
  );
};

export default App;

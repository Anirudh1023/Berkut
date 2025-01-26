"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Animation variants (unchanged)
const menuVariants = {
  open: {
    width: ["100%", "480px"], // Responsive width for mobile and desktop
    height: ["100vh", "650px"], // Responsive height for mobile and desktop
    top: ["0px", "-25px"],
    right: ["0px", "-25px"],
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: ["100px", "100px"], // Keep button width consistent
    height: ["40px", "40px"], // Keep button height consistent
    top: "0px",
    right: "0px",
    transition: {
      duration: 0.75,
      delay: 0.35,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const perspective = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: 80,
    translateX: -20,
  },
  enter: (i) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
      opacity: { duration: 0.35 },
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "linear", ease: [0.76, 0, 0.24, 1] },
  },
};

const slideIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
  },
};

// Data
const links = [
  { title: "Projects", href: "/" },
  { title: "Agency", href: "/" },
  { title: "Expertise", href: "/" },
  { title: "Careers", href: "/" },
  { title: "Contact", href: "/" },
];

const footerLinks = [
  { title: "Facebook", href: "/" },
  { title: "LinkedIn", href: "/" },
  { title: "Instagram", href: "/" },
  { title: "Twitter", href: "/" },
];

// Nav Component
function Nav() {
  return (
    <div className="flex flex-col justify-between p-[100px_40px_50px_40px] h-full box-border">
      <div className="flex flex-col gap-2.5">
        {links.map((link, i) => (
          <div key={`b_${i}`} className="origin-bottom perspective-120">
            <motion.div
              custom={i}
              variants={perspective}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <a
                href={link.href}
                className="text-5xl no-underline text-[#4A372B]"
              >
                {link.title}
              </a>
            </motion.div>
          </div>
        ))}
      </div>
      <motion.div className="flex flex-wrap">
        {footerLinks.map((link, i) => (
          <motion.a
            key={`f_${i}`}
            href={link.href}
            custom={i}
            variants={slideIn}
            initial="initial"
            animate="enter"
            exit="exit"
            className="w-1/2 mt-1.25 text-[#4A372B]"
          >
            {link.title}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}

// Button Component
function Button({ isActive, toggleMenu }) {
  return (
    <div className="absolute top-0 right-0 w-[100px] h-[40px] cursor-pointer rounded-[25px] overflow-hidden">
      <motion.div
        className="relative w-full h-full"
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className="w-full h-full bg-[#E4A05F] flex items-center justify-center font-futura-hv"
          onClick={toggleMenu}
        >
          <PerspectiveText label="Menu" />
        </div>
        <div
          className="w-full h-full bg-[#4A372B] flex items-center justify-center"
          onClick={toggleMenu}
        >
          <PerspectiveText label="Close" />
        </div>
      </motion.div>
    </div>
  );
}

// PerspectiveText Component
function PerspectiveText({ label }) {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full transform-style-preserve-3d transition-transform duration-750 ease-custom">
      <p className="transition-all duration-750 ease-custom pointer-events-none uppercase">
        {label}
      </p>
      <p className="absolute transform-origin-bottom-center transform-rotateX-[-90deg] translate-y-[9px] opacity-0 transition-all duration-750 ease-custom pointer-events-none uppercase">
        {label}
      </p>
    </div>
  );
}

// Main Navbar Component
export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="fixed right-[50px] top-[50px] z-50">
      <motion.div
        className="bg-[#E4A05F] rounded-[25px] relative"
        variants={menuVariants}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>{isActive && <Nav />}</AnimatePresence>
      </motion.div>
      <Button isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
    </div>
  );
}

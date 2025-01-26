import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center opacity-80"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font text-berkut-skin">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base text-berkut-dark">
              {description}
            </p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-berkut-light px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #E4A05F, #FBF2C0)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20 text-berkut-tint">Know more</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-berkut-skin pb-52 z-10">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-berkut-tint">
          The Berkut Difference
        </p>
        <p className="max-w-md font-circular-web text-lg text-berkut-dark opacity-50">
          For us, it's about more than just seeing the world, it's about
          experiencing it. It's about feeling its pulse and the shared rhythms
          of Intrepid people all over the world. To be Intrepid is far more than
          a lust for travel, we're an antidote to loneliness. We connect people
          to the heartbeat of adventure and the soul of the planet.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/about.mp4"
          title={<>WHO WE ARE</>}
          description="We've been taking travellers around the globe and connecting people from all walks of life since 2XXX."
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/story.mp4"
            title={<>Our Story</>}
            description="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/work.mp4"
            title={<>How our trips work</>}
            description="Small group adventures with freedom to explore and guidance to go beyond the usual sights."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/travel.mp4"
            title={<>Why Travel With Us</>}
            description="Immersive experiences, small groups (12–14 people), and expert local leaders—our travel style celebrates the world while respecting its people and places."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-berkut-dark p-5">
            <h1 className="bento-title font-futura-hv max-w-64 text-berkut-skin">
              Our Purpose
            </h1>
            <p className="max-w-64 text-xs md:text-base text-berkut-tint">
              We're here to connect people to the heartbeat of adventure and the
              soul of the planet.
            </p>

            <img
              src={"/img/transparent.svg"}
              alt="Icon"
              className="left-1 bottom-2 w-24 h-24"
            />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/last.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center opacity-80"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;

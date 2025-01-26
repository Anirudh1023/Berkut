import React from "react";
import { Carousel, Card } from "./Carousel";
import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const BlogPost1 = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Previous BlogPost1 content remains the same */}
    </div>
  );
};

const BlogPost2 = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Previous BlogPost2 content remains the same */}
    </div>
  );
};

const BlogPost3 = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Previous BlogPost3 content remains the same */}
    </div>
  );
};

const BlogPost4 = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Previous BlogPost4 content remains the same */}
    </div>
  );
};

const BlogPost5 = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Previous BlogPost5 content remains the same */}
    </div>
  );
};

const BlogPost6 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Previous BlogPost6 content remains the same */}
    </div>
  );
};

const data = [
  {
    category: "Maintenance Tips",
    title: "How Often Should You Clean Your Curtains and Carpets?",
    src: "/img/Hero4.jpg",
    content: <BlogPost1 />,
  },
  {
    category: "Expert Advice",
    title: "Four Common Dry Cleaning Myths You Need to Know About",
    src: "/img/Hero1.jpg",
    content: <BlogPost2 />,
  },
  {
    category: "Laundry Guide",
    title: "What's the Difference Between Laundry and Dry Cleaning?",
    src: "/img/Hero1.jpg",
    content: <BlogPost3 />,
  },
  {
    category: "Leather Care",
    title: "Keep Your Leather Jacket Looking New: Essential Care",
    src: "/img/Hero1.jpg",
    content: <BlogPost6 />,
  },
  {
    category: "Leather Care",
    title: "How to Clean Leather? : The Complete Guide",
    src: "/img/Hero1.jpg",
    content: <BlogPost4 />,
  },
  {
    category: "Stain Removal",
    title: "How to Remove Color Bleeding Stains from Clothes: A Quick Guide",
    src: "/img/Hero1.jpg",
    content: <BlogPost5 />,
  },
];

export default function Blogs() {
  const cards = data
    .filter((card) => card !== undefined)
    .map((card, index) => <Card key={index} card={card} index={index} />);

  return (
    <div
      id="blogs"
      className="min-h-screen bg-berkut-light pt-10 relative overflow-x-hidden px-4 sm:px-10 rounded-t-[50px] sm:rounded-t-[100px]"
    >
      <div className="relative z-10 w-full">
        <div className="text-center mb-8">
          <AnimatedTitle
            title="Get inspired on The Good Times"
            containerClass="mt-5 pointer-events-none !text-berkut-dark relative z-10"
          />
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-5">
            Click on the card to know more
          </p>
        </div>

        <div className="w-full">
          <Carousel items={cards} />
        </div>

        <div className="mt-8 flex w-full justify-center">
          <div className="flex flex-col items-center text-center">
            <p className="max-w-sm text-berkut-tint font-semibold">
              Since the very beginning, we've been about creating positive
              change through the joy of travel.
            </p>

            <Button
              id="realm-btn"
              title="discover prologue"
              containerClass="mt-5 !bg-berkut-tint"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

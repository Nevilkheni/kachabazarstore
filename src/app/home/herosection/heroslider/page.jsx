"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "The Best Quality Products Guaranteed!",
    desc: "The Best Quality Products Guaranteed!",
    img: "https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1697688491%2Fsettings%2Fslider-1_rl8qdc.jpg&w=1920&q=75",
  },
  {
    id: 2,
    title: "Best Different Type of Grocery Store",
    desc: "Quickly aggregate empowered networks after emerging products...",
    img: "https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1697688491%2Fsettings%2Fslider-2_o6aezc.jpg&w=1920&q=75",
  },
  {
    id: 3,
    title: "Quality Freshness Guaranteed!",
    desc: "Intrinsicly fashion performance based products rather than accurate benefits...",
    img: "https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1697688492%2Fsettings%2Fslider-3_iw4nnf.jpg&w=1920&q=75",
  },
  {
    id: 4,
    title: "The Best Quality Products Guaranteed!",
    desc: "Dramatically facilitate effective total linkage for go forward processes...",
    img: "https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1697688491%2Fsettings%2Fslider-1_rl8qdc.jpg&w=1920&q=75",
  },
  {
    id: 5,
    title: "Best Different Type of Grocery Store",
    desc: "Quickly aggregate empowered networks after emerging products...",
    img: "https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1697688491%2Fsettings%2Fslider-2_o6aezc.jpg&w=1920&q=75",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      zIndex: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 100,
      zIndex: 0,
    }),
  };

  return (
    <div className=" min-w-full xl:pr-6 h-[170px] sm:h-[170px] md:h-[293px] lg:h-auto lg:min-w-[60%] ">
      <div className="relative w-full  h-full    overflow-hidden rounded-lg   ">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={slides[index].id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", ease: "easeInOut", duration: 1 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slides[index].img}
              alt={slides[index].title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0" />

            <div className="absolute inset-0 flex flex-col justify-center items-start  px-5 sm:px-10  space-y-2">
              <h2 className="text-lg md:text-2xl lg:max-w-sm line-clamp-1  font-bold text-black ">
                {slides[index].title}
              </h2>
              <p className="text-gray-600  text-base md:text-md line-clamp-1 lg:max-w-sm drop-shadow">
                {slides[index].desc}
              </p>
              <button className="cursor-pointer bg-[#00bc7d] hidden sm:block mt-3 lg:mt-1 text-white font-medium font-sans text-[14px] px-6 py-2.5 rounded-lg hover:bg-green-700 transition">
                Shop Now
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4  left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`w-2 h-2 rounded-full cursor-pointer transition ${
                index === i ? "bg-blue-500" : "bg-gray-400/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

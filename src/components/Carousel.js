// Carousel.js

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };
  const handlePage = (page) => {
    router.push(page);
  };

  const handleCircleClick = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex transition ease-out duration-500`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative w-full flex-shrink-0 rounded-lg overflow-hidden"
          >
            <Image
              className="opacity-40 rounded-lg"
              width={1500}
              height={600}
              src={slide.imgsrc}
              alt={`Slide ${index + 1}`}
            />
            <div
              className={`absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4 bg-black bg-opacity-50`}
            >
              <div
                className={`max-w-[60%] md:max-w-[60%] lg:max-w-[40%] mx-auto`}
              >
                <h2
                  className={`text-base text-blue-50 md:text-3xl lg:text-4xl font-medium mb-4 break-words`}
                >
                  {slide.content}
                </h2>

                <p
                  className={`text-xs md:text-base lg:text-xl font-normal md:font-normal whitespace-normal`}
                >
                  {slide.text}
                </p>
                <button
                  onClick={() => {
                    handlePage(slide.page);
                  }}
                  className={`w-auto mt-8 mb-4 text-white bg-blue-700 hover:bg-blue-900 font-medium rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-xs md:text-base lg:text-lg px-4 md:px-7 py-2`}
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`absolute top-0 h-full w-full flex items-center justify-between px-4 pointer-events-none`}
      >
        <button
          onClick={previousSlide}
          className={`text-3xl md:text-4xl lg:text-5xl text-white pointer-events-auto`}
        >
          <BsFillArrowLeftCircleFill style={{ color: "white" }} />
        </button>
        <button
          onClick={nextSlide}
          className={`text-3xl md:text-4xl lg:text-5xl text-white pointer-events-auto`}
        >
          <BsFillArrowRightCircleFill style={{ color: "white" }} />
        </button>
      </div>

      {!isMobile ? (
        <div
          className={`absolute bottom-2 pb-4 flex justify-center gap-3 w-full`}
        >
          {slides.map((s, i) => (
            <div
              onClick={() => handleCircleClick(i)}
              key={"circle" + i}
              className={`rounded-full w-1 md:w-3 lg:w-5 h-1 md:h-3 lg:h-5 cursor-pointer ${
                i === current ? "bg-white" : "bg-blue-500"
              }`}
            ></div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

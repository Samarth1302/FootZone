import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };
  // const prevSlide = () => {
  //   if (current === 0) setCurrent(0);
  //   else setCurrent(current + 1);
  // };
  const handlePage = (page) => {
    router.push(page);
  };

  const handleCircleClick = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 9000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative overflow-hidden lg:rounded-2xl">
      <div
        className={`flex transition-transform ease-in-out duration-500`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative w-full flex-shrink-0 overflow-hidden"
          >
            <Image
              className="opacity-40 lg:rounded-2xl"
              width={1500}
              height={600}
              src={slide.imgsrc}
              alt={`Slide ${index + 1}`}
              loading="lazy"
            />
            <div
              className={`absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4 bg-black bg-opacity-50`}
            >
              <div className={`max-w-[60%] lg:max-w-[70%] mx-auto`}>
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
                  className={`w-auto mt-8 mb-4 text-white bg-blue-800 hover:bg-blue-900  focus:bg-white dark:focus:bg-blue-700 focus:border-2 focus:border-blue-950 focus:text-blue-950 dark:focus:text-white font-medium rounded-lg focus:outline-none focus:ring text-xs md:text-base lg:text-lg px-4 md:px-7 py-2`}
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
      ></div>

   
        <div
          className={`absolute bottom-2 pb-4 flex justify-center gap-3 w-full`}
        >
          {slides.map((s, i) => (
            <div
              onClick={() => handleCircleClick(i)}
              key={"circle" + i}
              className={`rounded-full w-1 md:w-3 lg:w-4 h-1 md:h-3 lg:h-4 cursor-pointer ${
                i === current ? "bg-white" : "bg-blue-800"
              }`}
            ></div>
          ))}
        </div>
    </div>
  );
}

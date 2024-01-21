import Head from "next/head";
import Carousel from "@/components/Carousel";
import Typewriter from "typewriter-effect";
import Image from "next/image";

export default function Home() {
  let slides = [
    {
      imgsrc: "/comp.jpg",
      content: "Soccer stats",
      text: "Check out the latest match fixtures, player stats, and more.",
      buttonText: "Explore",
    },
    {
      imgsrc: "/play.jpg",
      content: "Latest News",
      text: "Stay updated with the latest football news from around the world.",
      buttonText: "Discover",
    },
    {
      imgsrc: "/save.jpg",
      content: "Fan Discussion",
      text: "Join the discussion! Read and share comments from passionate football fans.",
      buttonText: "Connect",
    },
  ];
  return (
    <div className="min-h-screen">
      <Head>
        <title>Home - FootZone</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta
          name="keywords"
          content="football soccer stadium players athletes sport"
        />
      </Head>
      <div className="absolute bg-black top-30 left-0 -z-10">
        <Image
          className="opacity-30"
          src="/ball.jpg"
          width={2000}
          height={200}
        />
      </div>
      <div
        className="text-center md:pr-10 text-white text-lg md:text-2xl
      font-medium pt-14 md:pt-20 z-20"
      >
        <div className="text-2xl md:text-4xl font-semibold">
          <p>
            Welcome to <span className="text-blue-500">FootZone</span>{" "}
          </p>
        </div>
        <div className="pt-2 md:pt-10 text-cyan-100">
          <Typewriter
            options={{
              strings: [
                "Explore soccer stats.",
                "Get to know latest football  news.",
                "Join the fan discussion.",
              ],
              delay: 100,
              loop: true,
              autoStart: true,
            }}
          />
        </div>
      </div>
      <div className="w-[90%] lg:w-[50%] lg:z-20 m-auto rounded-lg bg-gray-600 mb-10 mt-32 md:mt-80 lg:mt-16">
        <Carousel slides={slides} />
      </div>
    </div>
  );
}

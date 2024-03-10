import Head from "next/head";
import Carousel from "@/components/Carousel";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import Link from "next/link";
import {
  FaNewspaper,
  FaUsers,
  FaShoppingCart,
  FaComments,
} from "react-icons/fa";

export default function Home({ dark }) {
  let slides = [
    {
      imgsrc: "/comp.jpg",
      page: "league",
      content: "Soccer stats",
      text: "Check out the latest match fixtures, player stats, and more.",
      buttonText: "Explore",
    },
    {
      imgsrc: "/play.jpg",
      page: "news",
      content: "Latest News",
      text: "Stay updated with the latest football news from around the world.",
      buttonText: "Discover",
    },
    {
      imgsrc: "/save.jpg",
      page: "league",
      content: "Fan Discussion",
      text: "Join the discussion! Read and share comments from passionate football fans.",
      buttonText: "Connect",
    },
  ];
  return (
    <div className={`min-h-screen ${dark ? "dark" : ""} dark:bg-black`}>
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
          width={4000}
          height={3000}
          alt="Background image"
          priority
        />
      </div>
      <section
        className="text-center md:pr-10 text-white text-lg md:text-2xl
      font-medium pt-14 md:pt-20 z-20"
      >
        <div className="text-2xl md:text-4xl font-medium">
          <p>
            Welcome to <span className="text-blue-300">FootZone</span>{" "}
          </p>
        </div>
        <div className="pt-2 md:pt-10 text-cyan-100">
          <Typewriter
            options={{
              strings: [
                "Explore soccer stats",
                "Get latest football news",
                "Join the fan discussion",
                "Login and interact with soccer bot",
              ],
              delay: 100,
              loop: true,
              autoStart: true,
            }}
          />
        </div>
      </section>
      <div className="w-[90%] bg-gray-600 lg:w-[50%] lg:z-20 m-auto rounded-lg mb-10 mt-32 md:mt-80 lg:mt-16 dark:bg-gray-800">
        <Carousel slides={slides} />
      </div>
      <footer className="text-white-600 bg-slate-100 body-font dark:bg-slate-900 text-center">
        <div className="py-10 mx-auto flex justify-center items-center">
          <Link href="#" className="flex items-center justify-center">
            {dark ? (
              <Image
                src="/dark-logo.png"
                width={320}
                height={320}
                alt="Logo"
                priority
              />
            ) : (
              <Image
                src="/logo.png"
                width={320}
                height={320}
                alt="Logo"
                priority
              />
            )}
          </Link>
        </div>
        <div className="flex flex-wrap mx-4 pb-10">
          <div className="xl:w-1/4 md:w-1/2 p-4">
            <div className="border border-gray-400 dark:hover:bg-slate-800 hover:cursor-auto p-6 rounded-lg">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-black mb-4">
                <FaNewspaper />
              </div>
              <h2 className="text-lg text-gray-900 dark:text-white font-semibold title-font mb-2">
                Latest News
              </h2>
              <p className="leading-relaxed text-base dark:text-white">
                Stay updated with the latest football news and updates from
                around the world.
              </p>
            </div>
          </div>
          <div className="xl:w-1/4 md:w-1/2 p-4">
            <div className="border dark:hover:bg-slate-800 hover:cursor-auto border-gray-400 p-6 rounded-lg">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-black mb-4">
                <FaUsers />
              </div>
              <h2 className="text-lg text-gray-900 dark:text-white font-semibold title-font mb-2">
                Player Stats
              </h2>
              <p className="leading-relaxed text-base dark:text-white">
                Explore detailed statistics and performance metrics of your
                favorite football players.
              </p>
            </div>
          </div>

          <div className="xl:w-1/4 md:w-1/2 p-4">
            <div className="border dark:hover:bg-slate-800 hover:cursor-auto border-gray-400 p-6 rounded-lg">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-black-500 mb-4">
                <FaShoppingCart />
              </div>
              <h2 className="text-lg text-gray-900 dark:text-white font-semibold title-font mb-2">
                Ecommerce Page
              </h2>
              <p className="leading-relaxed text-base dark:text-white">
                Shop for jerseys, cleats, footballs, and more football
                merchandise.
              </p>
            </div>
          </div>

          <div className="xl:w-1/4 md:w-1/2 p-4">
            <div className="border dark:hover:bg-slate-800 hover:cursor-auto border-gray-400 p-6 rounded-lg">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-black-500 mb-4">
                <FaComments />
              </div>
              <h2 className="text-lg text-gray-900 dark:text-white font-semibold title-font mb-2">
                Fan Discussion
              </h2>
              <p className="leading-relaxed text-base dark:text-white">
                Engage in discussions and connect with fellow football fans.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

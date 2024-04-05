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

export default function Home({ dark, sidebar }) {
  let slides = [
    {
      imgsrc: "/comp.jpg",
      page: "league",
      content: "Soccer stats",
      text: "Check out the latest league fixtures, team stats, standings and more.",
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
      page: "team",
      content: "Discover Teams",
      text: "Join the revolution! View different teams and support your favorite.",
      buttonText: "View",
    },
    {
      imgsrc: "/shop.jpg",
      page: "shop",
      content: "Foot Store",
      text: "Browse through a catalog of various products and football accessories",
      buttonText: "Shop",
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
      <div>
        <div className="absolute bg-black top-30 -z-10">
          <Image
            className="opacity-30"
            src="/ball.jpg"
            width={4000}
            height={3000}
            alt="Background image"
            priority
          />
        </div>
        <div className="text-center text-white text-2xl md:text-4xl font-medium pt-14 md:pr-10 md:pt-20 z-20">
          <p>
            Welcome to <span className="text-blue-300">FootZone</span>{" "}
          </p>

          <div className="pt-2 -mb-2 md:-mb-1 text-lg md:text-2xl md:pt-10 text-cyan-100">
            <Typewriter
              options={{
                strings: [
                  "Explore soccer stats",
                  "Get latest football news",
                  "Join the fan discussion",
                  "Interact with soccer bot",
                ],
                delay: 100,
                loop: true,
                autoStart: true,
              }}
            />
          </div>
        </div>
      </div>
      <div className={`w-full bg-gray-500 lg:w-[50%] lg:z-20 m-auto mt-24 ${sidebar? "md:mt-40":"md:mt-64"} lg:mt-16 lg:mb-20 dark:bg-gray-800 lg:rounded-2xl`}>
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
            <div className="border border-gray-400 hover:cursor-auto p-6 rounded-lg">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-black mb-4">
                <FaNewspaper />
              </div>
              <h2 className="text-lg text-gray-900 dark:text-white font-semibold title-font mb-2">
                Soccer News
              </h2>
              <p className="leading-relaxed text-base dark:text-white">
                Get latest soccer
                news from popular news sites.
              </p>
            </div>
          </div>
          <div className="xl:w-1/4 md:w-1/2 p-4">
            <div className="border hover:cursor-auto border-gray-400 p-6 rounded-lg">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-black mb-4">
                <FaUsers />
              </div>
              <h2 className="text-lg text-gray-900 dark:text-white font-semibold title-font mb-2">
                Football World
              </h2>
              <p className="leading-relaxed text-base dark:text-white">
                Review and follow
                league standings, fixtures, stats and more.
              </p>
            </div>
          </div>

          <div className="xl:w-1/4 md:w-1/2 p-4">
            <div className="border hover:cursor-auto border-gray-400 p-6 rounded-lg">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-black-500 mb-4">
                <FaShoppingCart />
              </div>
              <h2 className="text-lg text-gray-900 dark:text-white font-semibold title-font mb-2">
                Ecommerce Page
              </h2>
              <p className="leading-relaxed text-base dark:text-white">
                Shop for football accessories through the ecommerce page.
              </p>
            </div>
          </div>

          <div className="xl:w-1/4 md:w-1/2 p-4">
            <div className="border hover:cursor-auto border-gray-400 p-6 rounded-lg">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-black-500 mb-4">
                <FaComments />
              </div>
              <h2 className="text-lg text-gray-900 dark:text-white font-semibold title-font mb-2">
                Commenting system
              </h2>
              <p className="leading-relaxed text-base dark:text-white">
                Experience fan discussions through commenting.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

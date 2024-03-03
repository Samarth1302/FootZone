import Head from "next/head";
import Carousel from "@/components/Carousel";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import Link from "next/link";

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
      <footer className="text-white-600 bg-slate-100 body-font dark:bg-slate-900">
        <div className="pl-3 py-24 mx-auto flex text-center md:items-center max-2xl:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-auto flex-shrink-0 md:mx-0 text-center md:text-left">
            <Link
              href="#"
              className="flex title-font font-medium items-center md:justify-start justify-center 2xl: text-gray-900 dark:text-white"
            >
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
          <div className="flex-row flex md:pl-20 -mb-10 mt-10 md:mt-0 md:pr-10 text-center md:text-right lg:justify-end">
            <div className="w-full px-4">
              <div className="list-none flex flex-row space-x-8 lg:text-lg">
                <li>
                  <Link
                    href="#"
                    className="text-gray-800 text-base font-medium hover:text-gray-900 hover:underline underline-offset-2 dark:text-white"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-800 text-base font-medium hover:text-gray-900 hover:underline underline-offset-2 dark:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-800 text-base font-medium hover:text-gray-900 hover:underline underline-offset-2 dark:text-white"
                  >
                    Credits
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const League = ({ dark }) => {
  const [searchInput, setSearchInput] = useState("");
  const [originalLeagues, setOriginalLeagues] = useState([]);
  const [filteredLeagues, setFilteredLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/info/leagues`
        );
        const data = await response.json();
        setOriginalLeagues(data);
        setFilteredLeagues(data);
      } catch (err) {
        toast.error(err, {
          position: "top-left",
          toastId: "leagueerr",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: dark ? "dark" : "light",
        });
      }
    };

    fetchLeagues();
  }, []);

  const filterLeagues = () => {
    if (searchInput.trim() === "") {
      setFilteredLeagues(originalLeagues);
    } else {
      const filtered = originalLeagues.filter(
        (league) =>
          league.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          league.country.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredLeagues(filtered);
    }
  };

  useEffect(() => {
    filterLeagues();
  }, [searchInput]);

  return (
    <div className={` ${dark ? "dark" : ""} dark:bg-slate-900`}>
      <Head>
        <title>Leagues - FootZone</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta name="description" content="soccer leagues" />
        <meta
          name="keywords"
          content="football soccer stadium players leagues athletes sport"
        />
      </Head>
      <div className="text-gray-600 body-font dark:bg-slate-900">
        <div className="px-5 pt-4 mx-auto flex justify-between items-center">
          <h1 className="text-lg md:text-3xl font-bold  text-blue-900 dark:text-blue-200">
            Choose a League
          </h1>
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border-2 p-1 px-2 md:px-3 border-gray-400 dark:bg-slate-950 md:p-2 rounded-md dark:text-white"
          />
        </div>
        <div className="min-h-screen px-5 py-12 mx-auto">
          {filteredLeagues && (
            <div className="flex flex-wrap -m-4">
              {filteredLeagues.map((league, index) => (
                <Link key={index} href={`/leagues/${league.id}`} legacyBehavior>
                  <a className="p-4 md:w-1/2 lg:w-1/4 block">
                    <div className="flex h-full border-2 border-blue-200 dark:border-blue-50 border-opacity-40 rounded-lg overflow-hidden hover:bg-blue-200 dark:hover:bg-blue-100 hover:bg-opacity-20 items-center text-blue-900 dark:text-blue-100 dark:hover:text-blue-950  dark:font-semibold font-medium">
                      <div className="w-1/3">
                        <Image
                          src={league.logo}
                          alt={league.name}
                          width={150}
                          height={150}
                          className="object-contain object-center w-30 h-30 p-6"
                        />
                      </div>
                      <div className="w-2/3 p-6 text-center items-center">
                        <h1 className="title-font text-xl mb-3">
                          {league.name}
                        </h1>
                        <p className="leading-relaxed mb-3 text-lg">
                          {league.country}
                        </p>
                        <div className="flex items-center flex-wrap"></div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default League;

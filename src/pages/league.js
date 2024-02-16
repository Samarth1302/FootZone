import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const League = () => {
  const [searchInput, setSearchInput] = useState("");
  const [originalLeagues, setOriginalLeagues] = useState([]);
  const [filteredLeagues, setFilteredLeagues] = useState([]);

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
        theme: "light",
      });
    }
  };

  useEffect(() => {
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
  }, [searchInput, originalLeagues]);
  return (
    <div className="min-h-screen">
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
      <section className="text-gray-600 body-font">
        <div className="px-5 pt-4 mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold  text-blue-900">Choose a League</h1>
          <input
            type="text"
            placeholder="Search a league.."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border-2 px-3 border-gray-400 p-2 rounded-md"
          />
        </div>
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4">
            {filteredLeagues.map((league, index) => (
              <Link key={index} href={`/leagues/${league.id}`} legacyBehavior>
                <a className="p-4 md:w-1/2 lg:w-1/4 block">
                  <div className="flex h-full border-2 border-blue-200 border-opacity-40 rounded-lg overflow-hidden hover:bg-blue-200 hover:bg-opacity-20 items-center">
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
                      <h1 className="title-font font-medium text-xl text-blue-900 mb-3">
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
        </div>
      </section>
    </div>
  );
};

export default League;

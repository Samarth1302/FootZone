import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const Teams = ({ dark }) => {
  const [originalTeams, setOriginalTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage] = useState(20);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/info/teams/all`
        );
        const data = await response.json();
        setOriginalTeams(data);
        setFilteredTeams(data);
      } catch (err) {
        toast.error(err);
      }
    };

    fetchTeams();
  }, []);

  const filterTeams = () => {
    const searchTerm = searchInput.toLowerCase();
    if (searchInput.trim() === "") {
      setFilteredTeams(originalTeams);
    } else {
      const filtered = originalTeams.filter((team) =>
        team.name.toLowerCase().includes(searchTerm)
      );
      setFilteredTeams(filtered);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    filterTeams();
  }, [searchInput]);

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const maxPageNumbers = 5;
  const totalPages = Math.ceil(filteredTeams.length / teamsPerPage);

  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  if (totalPages <= maxPageNumbers) {
    startPage = 1;
    endPage = totalPages;
  } else if (endPage === totalPages) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  return (
    <div className={` ${dark ? "dark" : ""} dark:bg-slate-900`}>
      <Head>
        <title>Teams - FootZone</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta name="description" content="Soccer teams" />
        <meta
          name="keywords"
          content="football soccer stadium players leagues athletes sport"
        />
      </Head>
      <div className="text-gray-600 body-font dark:bg-slate-900">
        <div className="px-5 pt-4 mx-auto flex justify-between items-center">
          <h1 className="text-lg md:text-3xl font-bold text-blue-900 dark:text-blue-200">
            All Teams
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
          {filteredTeams && (
            <div className="flex flex-wrap -m-4">
              {currentTeams.map((team, index) => (
                <Link
                  key={index}
                  href={`/teams/${team.id}?leagueId=${team.leagueId}`}
                  legacyBehavior
                >
                  <a className="p-4 md:w-1/2 lg:w-1/4 block">
                    <div className="flex h-full border-2 border-blue-200 dark:border-blue-50 border-opacity-40 rounded-lg overflow-hidden hover:bg-blue-200 dark:hover:bg-blue-100 hover:bg-opacity-20 items-center text-blue-900 dark:text-blue-100 dark:hover:text-blue-950 dark:font-semibold font-medium">
                      <div className="w-1/3">
                        <Image
                          src={team.logo}
                          alt={team.name}
                          width={150}
                          height={150}
                          className="object-contain object-center w-30 h-30 p-6"
                        />
                      </div>
                      <div className="w-2/3 p-6 text-center items-center">
                        <h1 className="title-font text-xl mb-3">{team.name}</h1>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          )}
          {filteredTeams.length > teamsPerPage && (
            <div>
              <ul className="flex justify-center mt-14 font-bold">
                {currentPage > 1 && (
                  <li
                    className={`mx-1 p-1 px-1 rounded-md cursor-pointer ${
                      currentPage === 1
                        ? "bg-gray-200 dark:bg-gray-700 dark:text-white"
                        : "bg-blue-200 text-black"
                    }`}
                    onClick={() => paginate(currentPage - 1)}
                  >
                    <GrFormPrevious className="mt-1 text-lg" />
                  </li>
                )}
                {Array.from({ length: endPage - startPage + 1 }).map(
                  (_, index) => {
                    const pageNumber = startPage + index;
                    return (
                      <li
                        key={pageNumber}
                        className={`mx-1 p-1 px-3 rounded-md cursor-pointer ${
                          currentPage === pageNumber
                            ? "bg-blue-200 text-black"
                            : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                        }`}
                        onClick={() => paginate(pageNumber)}
                      >
                        {pageNumber}
                      </li>
                    );
                  }
                )}
                {currentPage < totalPages && (
                  <li
                    className={`mx-1 p-1 px-1 rounded-md cursor-pointer ${
                      currentPage === totalPages
                        ? "bg-gray-200 dark:bg-gray-700 dark:text-white"
                        : "bg-blue-200 text-black"
                    }`}
                    onClick={() => paginate(currentPage + 1)}
                  >
                    <GrFormNext className="mt-1 text-lg" />
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams;

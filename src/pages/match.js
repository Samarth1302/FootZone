import Head from "next/head";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import Image from "next/image";

const Match = ({ dark }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [competitions, setCompetitions] = useState([]);
  const [selectedComp, setSelectedComp] = useState("Today");
  const [matches, setMatches] = useState([]);

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-IN", {
      ...options,
      timeZone: "Asia/Kolkata",
    });
  };

  const handleFilterChange = async (compId) => {
    if (compId === "Today" || !compId) {
      setStartDate(new Date());
      setEndDate(new Date());
      setSelectedComp("Today");
    } else {
      setSelectedComp(compId);
    }
  };

  useEffect(() => {
    const fetchComps = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/match/competitions`
        );
        const data = await response.json();
        setCompetitions(data);
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching competitions"
        );
      }
    };
    fetchComps();
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const startDateUTC = startDate.toISOString();
        const endDateUTC = endDate.toISOString();
        let endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URI}/match/matches`;
        if (selectedComp && selectedComp !== "Today") {
          endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URI}/match/${selectedComp}/matches?startDate=${startDateUTC}&endDate=${endDateUTC}`;
        }
        const response = await fetch(endpoint);
        const data = await response.json();
        setMatches(data);
        if (selectedComp && selectedComp !== "Today") setMatches(data.matches);
      } catch (error) {
        toast.error("Failed to fetch matches");
      }
    };
    fetchMatches();
  }, [selectedComp, startDate, endDate]);

  return (
    <div className={` ${dark ? "dark" : ""} dark:bg-slate-900`}>
      <Head>
        <title>Fixtures - FootZone</title>
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
      <div className="min-h-screen text-black body-font dark:bg-slate-900 bg-blue-100">
        <h2 className="lg:pb-6 pt-8 md:pb-0 text-center justify-center tracking-wider text-xl md:text-2xl lg:text-3xl font-bold dark:text-white">
          Fixtures
        </h2>
        <div className="flex flex-col md:flex-row text-center justify-center items-center dark:bg-slate-900 pt-6 pb-4 px-2 dark:font-normal font-semibold">
          <div className="flex flex-row text-sm lg:text-base md:space-x-4 lg:space-x-20 items-center">
            <div className="flex flex-col">
              <p className="dark:text-white pb-1">From</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  handleFilterChange(selectedComp);
                }}
                className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg w-10/12 md:w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholderText="Select date start"
              />
            </div>
            <div className="flex flex-col">
              <p className="dark:text-white pb-1">To</p>
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  handleFilterChange(selectedComp);
                }}
                className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-10/12 md:w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholderText="Select date end"
              />
            </div>
            <div className="lg:mr-20 mt-6 text-sm lg:text-base select-wrapper">
              <select
                value={selectedComp}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-1 lg:ml-10 py-2.5 w-10/12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              >
                <option
                  value="Today"
                  className="text-left"
                >{`Today's matches`}</option>
                {competitions
                  .sort((a, b) => (a.compName > b.compName ? 1 : -1))
                  .map((competition) => (
                    <option
                      key={competition.compId}
                      value={competition.compId}
                      className="text-left"
                    >
                      {competition.compName === "Primera Division"
                        ? "La Liga"
                        : competition.compName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="px-4 flex md:px-10 lg:px-20 md:pt-4 md:pb-10 text-xs md:text-base -mb-8 pb-8">
          <ul className="lg:w-2/3 m-auto text-center justify-center">
            {matches.map((match, index) => (
              <li
                key={index}
                className="border p-4 flex flex-col md:flex-row dark:border-gray-600 dark:bg-gray-800 border-gray-300 rounded-lg my-8 bg-gray-100 items-center justify-center md:justify-between"
              >
                <div className="items-center">
                  <p className="dark:text-white text-xs items-center md:text-base mb-2">
                    {formatDate(match.utcDate)} IST
                  </p>
                  {match.area && match.competition && match.id && (
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex flex-row pb-2">
                        {match.competition.emblem && (
                          <Image
                            src={match.competition.emblem}
                            alt="Competition Emblem"
                            width={20}
                            height={20}
                          />
                        )}
                        <p className="dark:text-white pl-2 md:max-w-36 truncate text-center">
                          {match.competition.name}
                        </p>
                      </div>
                      <div className="flex flex-row pb-2">
                        <Image
                          src={match.area.flag}
                          alt="Country Flag"
                          width={20}
                          height={20}
                        />
                        <p className="dark:text-white pl-2 md:max-w-36 truncate justify-center text-center">
                          {match.area.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-4 space-x-10 mr-8">
                  <div className="flex flex-col items-center">
                    {match.homeTeam.crest ? (
                      <Image
                        src={match.homeTeam.crest}
                        alt={match.homeTeam.name}
                        width={50}
                        height={50}
                      />
                    ) : (
                      <Image
                        src="/no.jpg"
                        alt="Placeholder"
                        width={50}
                        height={50}
                      />
                    )}
                    <p
                      className={`dark:text-white max-w-20 md:max-w-32 lg:max-w-40 truncate ${
                        match.score.winner === "HOME_TEAM"
                          ? "text-green-500"
                          : ""
                      }`}
                    >
                      {match.homeTeam.name}
                    </p>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="w-16 hidden md:block h-0.5 bg-gray-400 transform -rotate-45"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    {match.awayTeam.crest ? (
                      <Image
                        src={match.awayTeam.crest}
                        alt={match.awayTeam.name}
                        width={50}
                        height={50}
                      />
                    ) : (
                      <Image
                        src="/no.jpg"
                        alt="Placeholder"
                        width={50}
                        height={50}
                      />
                    )}
                    <p
                      className={`dark:text-white max-w-20 md:max-w-32 lg:max-w-40 truncate ${
                        match.score.winner === "AWAY_TEAM"
                          ? "text-green-500"
                          : ""
                      }`}
                    >
                      {match.awayTeam.name}
                    </p>
                  </div>
                </div>

                <div
                  className={`${
                    match.score.fullTime.homeTeam ? "block" : "hidden"
                  }`}
                >
                  {match.score.fullTime.homeTeam && (
                    <p className="dark:text-white">
                      {match.score.fullTime.homeTeam} -{" "}
                      {match.score.fullTime.awayTeam}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Match;

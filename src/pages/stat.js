import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import Image from "next/image";
import GroupStanding from "@/components/GroupStanding";
import { TbArrowBigDownLineFilled } from "react-icons/tb";
import Head from "next/head";

const Stat = ({ dark }) => {
  const [selectedTab, setSelectedTab] = useState("Scorers");
  const [competitions, setCompetitions] = useState([]);
  const [selectedComp, setSelectedComp] = useState("");
  const [scorers, setScorers] = useState([]);
  const [standings, setStandings] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchComps = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/match/competitions`
        );
        const data = await response.json();
        const sortedData = data.sort((a, b) =>
          a.compName.localeCompare(b.compName)
        );
        setCompetitions(sortedData);
        if (sortedData.length > 0) {
          setSelectedComp(sortedData[0].compId);
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching competitions"
        );
      }
    };
    fetchComps();
  }, []);

  const leagueRoute = async (compId) => {
    try {
      if (selectedTab === "Standings" && compId) {
        const leagueMap = {
          2013: 71, // Campeonato Brasileiro Série A
          2016: 40, // Championship
          2021: 39, // Premier League
          2015: 61, // Ligue 1
          2002: 78, // Bundesliga
          2019: 135, // Serie A
          2003: 88, // Eredivisie
          2017: 94, // Primeira Liga
          2014: 140, // Primera Division
        };
        const leagueId = leagueMap[compId];
        if (leagueId) {
          router.push(`/leagues/${leagueId}`);
        } else {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/match/standings`
          );
          const data = await response.json();
          if (selectedComp === 2001) {
            setStandings(
              data.filter((obj) => obj.competition.name.includes("Champions"))
            );
          } else if (selectedComp === 2152) {
            setStandings(
              data.filter((obj) => obj.competition.name.includes("Copa"))
            );
          }
          console.log(standings);
        }
      }
    } catch (error) {
      toast.error("Failed to fetch standings", { id: "nostand" });
    }
  };

  const fetchScorers = async (compId) => {
    try {
      if (selectedTab === "Scorers" && compId) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/match/${compId}/scorers`
        );
        const data = await response.json();
        await setScorers(data);
      }
    } catch (error) {
      toast.error("Failed to fetch scorers", { id: "noscorer" });
    }
  };

  const handleFetchData = async (compId) => {
    if (selectedTab === "Scorers") {
      await fetchScorers(compId);
    } else if (selectedTab === "Standings") {
      await leagueRoute(compId);
    }
  };

  return (
    <div className={` ${dark ? "dark" : ""} `}>
      <Head>
        <title>Stats - FootZone</title>
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
      <div>
        <div className="min-h-screen dark:bg-slate-900 dark:text-white bg-blue-100">
          <div className="flex justify-center items-center space-x-4 py-4">
            <button
              onClick={() => setSelectedTab("Scorers")}
              className={`${
                selectedTab === "Scorers"
                  ? "bg-blue-400 dark:bg-slate-500 "
                  : "bg-slate-300 dark:bg-slate-700"
              } px-4 py-2 rounded-md`}
            >
              Top Scorers
            </button>
            <button
              onClick={() => setSelectedTab("Standings")}
              className={`${
                selectedTab === "Standings"
                  ? "bg-blue-400 dark:bg-slate-500 "
                  : "bg-slate-300 dark:bg-slate-700"
              } px-4 py-2 rounded-md`}
            >
              Standings
            </button>

            <div className="text-sm lg:text-base">
              <select
                value={selectedComp}
                onChange={(e) => {
                  setSelectedComp(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-1 lg:ml-10 py-2.5 w-10/12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              >
                {competitions.map((competition) => (
                  <option
                    key={competition.compId}
                    value={competition.compId}
                    className={
                      (competition.compId === 2001 ||
                        competition.compId === 2152) &&
                      selectedTab === "Standings"
                        ? "text-green-500"
                        : ""
                    }
                  >
                    {competition.compName === "Primera Division"
                      ? "La Liga"
                      : competition.compName}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                handleFetchData(selectedComp);
              }}
              className="bg-blue-300 flex flex-row items-center hover:bg-blue-400 dark:bg-slate-500 dark:hover:bg-slate-600 px-4 py-2 rounded-md"
            >
              Show
              <TbArrowBigDownLineFilled className="ml-2" />
            </button>
          </div>
          {scorers.length !== 0 &&
            selectedComp &&
            selectedTab === "Scorers" && (
              <div className="p-4 mt-4 pb-10">
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={scorers.competition.compSymb}
                    alt={scorers.competition.compName}
                    className="w-8 h-8 mr-2"
                  />
                  <h2 className="text-lg font-semibold">
                    {scorers.competition.compName} (
                    {scorers.competition.compNation})
                  </h2>
                  <p className="ml-8 text-lg font-semibold">Top 10 Scorers</p>
                </div>
                <table className="w-full border-collapse rounded-md">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-blue-300 dark:bg-slate-800 border border-gray-300 text-left">
                        Player
                      </th>
                      <th className="py-2 px-4 bg-blue-300 dark:bg-slate-800 border border-gray-300 text-left">
                        Team
                      </th>
                      <th className="py-2 px-4 bg-blue-300 dark:bg-slate-800 border border-gray-300 text-center">
                        Matches
                      </th>
                      <th className="py-2 px-4 bg-blue-300 dark:bg-slate-800 border border-gray-300 text-center">
                        Goals
                      </th>
                      <th className="py-2 px-4 bg-blue-300 dark:bg-slate-800 border border-gray-300 text-center">
                        Assists
                      </th>
                      <th className="py-2 px-4 hidden md:table-cell bg-blue-300 dark:bg-slate-800 border border-gray-300 text-center">
                        Penalties
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {scorers.scorers.map((scorer, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0 ? "bg-gray-100 dark:bg-slate-700" : ""
                        }
                      >
                        <td className="py-2 px-4 border border-gray-300 md:max-w-40 truncate">
                          {scorer.name}
                        </td>
                        <td className="py-2 px-4 border  border-gray-300 md:max-w-56 truncate">
                          <img
                            src={scorer.team.crest}
                            alt={scorer.team.name}
                            className="w-6 h-6 mr-2 inline-block"
                          />
                          {scorer.team.name}
                        </td>
                        <td className="py-2 px-4 border border-gray-300 text-center">
                          {scorer.playedMatches}
                        </td>
                        <td className="py-2 px-4 border border-gray-300 text-center">
                          {scorer.goals}
                        </td>
                        <td className="py-2 px-4 border border-gray-300 text-center">
                          {scorer.assists}
                        </td>
                        <td className="py-2 hidden md:table-cell px-4 border border-gray-300 text-center">
                          {scorer.penalties}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {scorers.scorers.length === 0 && (
                  <p className="text-center text-2xl mt-8">No data</p>
                )}
              </div>
            )}
          {standings.length !== 0 &&
            [2001, 2152].includes(selectedComp) &&
            selectedTab === "Standings" && (
              <div>
                {standings.map((group, index) => (
                  <GroupStanding key={index} group={group.teams} />
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Stat;

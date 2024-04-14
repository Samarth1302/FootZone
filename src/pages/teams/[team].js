import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Chart from "chart.js/auto";
import { IoClose } from "react-icons/io5";

const TeamDetails = ({ dark }) => {
  const router = useRouter();
  const { team, leagueId } = router.query;
  const [teamDetails, setTeamDetails] = useState(null);
  const [players, setPlayers] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [matchesChart, setMatchesChart] = useState(null);
  const [homeAwayChart, setHomeAwayChart] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (team && leagueId) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/info/leagues/${leagueId}/teams/${team}`
      )
        .then((response) => response.json())
        .then((data) => setTeamDetails(data))
        .catch((error) => console.error("Error fetching team details:", error));
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/info/leagues/${leagueId}/teams/${team}/players`
      )
        .then((response) => response.json())
        .then((data) => setPlayers(data))
        .catch((error) => console.error("Error fetching team players:", error));
    }
  }, [team, leagueId]);

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        handleClosePlayerDetails();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePlayerClick = (playerId) => {
    const selectedPlayer = filteredPlayers.find(
      (player) => player.playerId === playerId
    );
    setSelectedPlayer(selectedPlayer);
  };

  const handleClosePlayerDetails = () => {
    setSelectedPlayer(null);
  };

  useEffect(() => {
    if (teamDetails) {
      if (matchesChart) matchesChart.destroy();
      if (homeAwayChart) homeAwayChart.destroy();
      const matchesChartCtx = document.getElementById("matchesChart");
      const newMatchesChart = new Chart(matchesChartCtx, {
        type: "pie",
        data: {
          labels: ["Won", "Lost", "Drawn"],
          datasets: [
            {
              label: "Matches",
              data: [
                teamDetails.standings[0].all.win,
                teamDetails.standings[0].all.lose,
                teamDetails.standings[0].all.draw,
              ],
              backgroundColor: [
                "rgb(47, 173, 93)",
                "rgb(255, 69, 69)",
                "rgb(207, 151, 31)",
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
      setMatchesChart(newMatchesChart);

      const homeAwayChartCtx = document.getElementById("homeAwayChart");
      const newHomeAwayChart = new Chart(homeAwayChartCtx, {
        type: "bar",
        data: {
          labels: ["Home", "Away"],
          datasets: [
            {
              label: "Wins",
              data: [
                teamDetails.standings[0].home.win,
                teamDetails.standings[0].away.win,
              ],
              backgroundColor: "rgb(47, 173, 93)",
              borderColor: "rgb(128, 128, 128)",
            },
            {
              label: "Losses",
              data: [
                teamDetails.standings[0].home.lose,
                teamDetails.standings[0].away.lose,
              ],
              backgroundColor: "rgb(255, 69, 69)",
              borderColor: "rgb(128, 128, 128)",
            },
            {
              label: "Draws",
              data: [
                teamDetails.standings[0].home.draw,
                teamDetails.standings[0].away.draw,
              ],
              backgroundColor: "rgb(207, 151, 31)",
              borderColor: "rgb(128, 128, 128)",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "rgb(128, 128, 128)",
              },
            },
            x: {
              ticks: {
                color: "rgb(128, 128, 128)",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
      setHomeAwayChart(newHomeAwayChart);
    }
  }, [teamDetails]);

  const filterPlayers = () => {
    if (players) {
      if (searchInput.trim() === "") {
        setFilteredPlayers(players);
      } else {
        const filtered = players.filter(
          (player) =>
            player.firstname
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            player.lastname.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredPlayers(filtered);
      }
    }
  };

  useEffect(() => {
    filterPlayers();
  }, [searchInput, players]);

  return (
    <div
      className={`min-h-screen ${
        dark ? "dark" : ""
      } bg-white dark:bg-slate-900`}
    >
      <Head>
        <title>{teamDetails && teamDetails.name}_FootZone</title>
        <meta name="description" content="Team Details Page" />
      </Head>
      {teamDetails && (
        <main className="mx-auto p-4 dark:bg-slate-900">
          <button
            onClick={handleBack}
            className="font-medium text-blue-800 inline-flex items-center mb-4 hover:bg-blue-50 rounded-lg p-2 dark:hover:bg-slate-800 dark:text-blue-200 dark:hover:text-blue-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
            Back
          </button>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col mb-4 text-lg dark:text-blue-200">
                <div className="flex flex-row items-center mb-4">
                  {" "}
                  <Image
                    src={teamDetails.logo}
                    alt={teamDetails.name}
                    width={60}
                    height={30}
                  />
                  <h1 className="ml-4 text-xl md:text-3xl text-blue-950 dark:text-blue-100 font-bold">
                    {teamDetails.name} ({teamDetails.code})
                  </h1>
                </div>
                <p className="text-xl font-semibold">{teamDetails.country}</p>
                <p>Established: {teamDetails.foundedYear}</p>
              </div>
              {teamDetails.venue.name && (
                <div className="flex items-center mb-4 md:mr-6 lg:mr-20 dark:text-blue-200">
                  {teamDetails.venue.image ? (
                    <Image
                      src={teamDetails.venue.image}
                      alt="Stadium Icon"
                      width={150}
                      height={150}
                    />
                  ) : (
                    <Image
                      src={"/stadicon.png"}
                      alt="Stadium Icon"
                      width={150}
                      height={150}
                    />
                  )}
                  <div className="ml-8">
                    <p className="font-semibold">
                      Stadium: {teamDetails.venue.name}
                    </p>
                    <p>{teamDetails.venue.address},</p>
                    <p>{teamDetails.venue.city}</p>
                    <p>Capacity: {teamDetails.venue.capacity}</p>
                  </div>
                </div>
              )}
            </div>
            <hr className="my-8 border-t-4 border-gray-300" />
            {teamDetails.standings && (
              <div className="my-auto text-base dark:text-blue-50 md:text-lg lg:text-xl flex flex-col md:flex-row md:space-x-14 lg:space-x-40 text-center justify-center space-y-16 md:space-y-0">
                <div>
                  <p className="font-medium">
                    League Rank: {teamDetails.standings[0].rank}{" "}
                  </p>

                  <p>Total Points: {teamDetails.standings[0].points}</p>
                  <p className="text-green-600 dark:text-green-400">
                    Goals Scored: {teamDetails.standings[0].all.goals.for}
                  </p>
                  <p className="text-red-600 dark:text-red-400">
                    Goals Conceded: {teamDetails.standings[0].all.goals.against}
                  </p>
                  <p>Goal Difference: {teamDetails.standings[0].goalsDiff}</p>
                  <div className="flex text-center justify-center">
                    <p className="mr-2">Form:</p>
                    <div className="flex flex-row items-center">
                      {teamDetails.standings[0].form
                        .split("")
                        .map((result, i) => (
                          <span
                            key={i}
                            className={`${
                              result === "W"
                                ? "bg-green-500"
                                : result === "D"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            } h-3 w-3 mx-0.5 rounded-full`}
                          ></span>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="mx-auto">
                  <p className="mb-6">
                    Matches: {teamDetails.standings[0].all.played}
                  </p>
                  <div
                    className="chart-container"
                    style={{ width: "100px", height: "100px" }}
                  >
                    <canvas id="matchesChart"></canvas>
                  </div>
                </div>
                <div className="mx-auto">
                  <p className="font-medium mb-6">Home/Away Stats</p>
                  <div
                    className="chart-container"
                    style={{ width: "200px", height: "200px" }}
                  >
                    <canvas id="homeAwayChart"></canvas>
                  </div>
                </div>
              </div>
            )}
            <hr className="-mt-10 border-t-4 border-gray-300" />
            {players && (
              <div className="min-h-screen bg-white dark:bg-slate-800 flex mt-10 flex-col">
                <div className="flex flex-col space-y-3 md:flex-row justify-between items-center mb-14">
                  <h2 className="ml-4 text-2xl text-left font-bold dark:text-blue-100">
                    Players
                  </h2>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="border-2 px-3 border-gray-400 dark:bg-slate-950 p-2 rounded-md dark:text-white"
                  />
                </div>
                <div className="flex flex-wrap justify-center dark:text-blue-100">
                  {filteredPlayers.map((player, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center my-4 mx-auto md:mx-3 md:my-6 w-auto md:w-1/6 lg:w-1/12"
                      onClick={() => handlePlayerClick(player.playerId)}
                    >
                      <div className="w-20 h-20 rounded-full hover:cursor-pointer overflow-hidden">
                        <Image
                          src={player.photo}
                          alt={player.lastname}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-2 text-center max-w-20 md:max-w-40 truncate">
                        {player.name}
                      </p>
                    </div>
                  ))}
                </div>
                {selectedPlayer && (
                  <div className="fixed inset-0 bg-gray-700 bg-opacity-95 flex items-center justify-center">
                    <div
                      ref={overlayRef}
                      className="md:w-full max-w-sm md:max-w-md"
                    >
                      <div className="bg-white dark:bg-slate-900 dark:text-white rounded-lg shadow-md p-6 tracking-wide">
                        <div className="flex justify-end mb-1">
                          <button
                            onClick={handleClosePlayerDetails}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="text-black dark:text-white text-2xl cursor-pointer focus:outline-1"
                          >
                            <IoClose
                              style={{
                                color: isHovered
                                  ? dark
                                    ? "red"
                                    : "red"
                                  : dark
                                  ? "white"
                                  : "black",
                                transition: "all 0.3s ease",
                              }}
                            />
                          </button>
                        </div>
                        <h2 className="text-xl text-center font-semibold">
                          {selectedPlayer.name} ( {selectedPlayer.position} )
                        </h2>
                        <h3 className="text-lg mt-2 text-center font-medium">
                          {selectedPlayer.firstname +
                            " " +
                            selectedPlayer.lastname}
                        </h3>
                        <div className="flex flex-col md:flex-row items-center">
                          <div className="mt-4 mb-4 mx-auto md:mb-0">
                            <Image
                              src={selectedPlayer.photo}
                              alt={selectedPlayer.name}
                              width={120}
                              height={120}
                            />
                          </div>
                          <div className="ml-4 mt-4 mx-auto md:ml-6">
                            {selectedPlayer.age && (
                              <p className="mb-2">
                                <span className="font-semibold">Age :</span>{" "}
                                {selectedPlayer.age}
                              </p>
                            )}
                            {selectedPlayer.nationality && (
                              <p className="mb-2">
                                <span className="font-semibold">
                                  Nationality :
                                </span>{" "}
                                {selectedPlayer.nationality}
                              </p>
                            )}
                            {selectedPlayer.height && (
                              <p className="mb-2">
                                <span className="font-semibold">Height :</span>{" "}
                                {selectedPlayer.height}
                              </p>
                            )}
                            {selectedPlayer.weight && (
                              <p className="mb-2">
                                <span className="font-semibold">Weight :</span>{" "}
                                {selectedPlayer.weight}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default TeamDetails;

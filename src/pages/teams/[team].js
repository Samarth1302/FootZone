import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Image from "next/image";
import Link from "next/link";

const TeamDetails = () => {
  const router = useRouter();
  const { team, leagueId } = router.query;
  const [teamDetails, setTeamDetails] = useState(null);
  const [players, setPlayers] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>
          {teamDetails ? teamDetails.name : "Team Details"} - FootZone
        </title>
        <meta name="description" content="Team Details Page" />
      </Head>

      {teamDetails && (
        <main className="container mx-auto p-4">
          <Link href={`/leagues/${leagueId}`} legacyBehavior>
            <a className="font-medium text-blue-800 inline-flex items-center mb-4 hover:bg-blue-100 rounded-sm p-2">
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
              Back to League
            </a>
          </Link>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-row items-center mb-4">
              <Image
                src={teamDetails.logo}
                alt={teamDetails.name}
                width={60}
                height={30}
              />
              <h1 className="ml-4 text-3xl text-blue-950 font-bold">
                {teamDetails.name} ({teamDetails.code})
              </h1>
            </div>
            <div className="flex flex-col mb-4 text-lg">
              <p className="text-xl font-semibold">{teamDetails.country}</p>
              <p>Established: {teamDetails.foundedYear}</p>
            </div>
            <div className="flex items-center mb-4">
              {teamDetails.venue.image ? (
                <Image
                  src={teamDetails.venue.image}
                  alt="Stadium Icon"
                  width={100}
                  height={100}
                />
              ) : (
                <Image
                  src={"/stadicon.png"}
                  alt="Stadium Icon"
                  width={100}
                  height={100}
                />
              )}
              <div className="ml-8">
                <p className="font-semibold">
                  Home Stadium: {teamDetails.venue.name}
                </p>
                <p>{teamDetails.venue.address},</p>
                <p>{teamDetails.venue.city}</p>
                <p>Capacity: {teamDetails.venue.capacity}</p>
              </div>
            </div>
            {teamDetails.standings && (
              <div className="mt-10 mb-4 text-base md:text-xl flex flex-col md:flex-row md:space-x-14 lg:space-x-20 text-center justify-center">
                <div className="flex flex-row space-x-8 md:space-x-14 lg:space-x-20">
                  <div className="flex flex-col">
                    <p className="font-medium">
                      League Rank: {teamDetails.standings[0].rank}{" "}
                    </p>
                    <p>Matches Played: {teamDetails.standings[0].all.played}</p>
                    <p className="text-green-600">
                      Matches Won: {teamDetails.standings[0].all.win}
                    </p>
                    <p className="text-red-600">
                      Matches Lost: {teamDetails.standings[0].all.lose}
                    </p>
                    <p className="text-yellow-600">
                      Matches Drawn: {teamDetails.standings[0].all.draw}
                    </p>{" "}
                  </div>
                  <div className="flex flex-col">
                    <p>Total Points: {teamDetails.standings[0].points}</p>
                    <p className="text-green-600">
                      Goals Scored: {teamDetails.standings[0].all.goals.for}
                    </p>
                    <p className="text-red-600">
                      Goals Conceded:{" "}
                      {teamDetails.standings[0].all.goals.against}
                    </p>
                    <p>Goal Difference: {teamDetails.standings[0].goalsDiff}</p>
                    <div className="flex text-center  justify-center">
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
                </div>

                <div className="flex flex-row mt-6 md:mt-0 space-x-20 md:space-x-14 lg:space-x-20 text-center justify-center">
                  <div className="flex flex-col">
                    <h2 className="font-semibold">Home stats</h2>
                    <p>Played- {teamDetails.standings[0].home.played}</p>
                    <p className="text-green-600">
                      Won- {teamDetails.standings[0].home.win}
                    </p>
                    <p className="text-red-600">
                      Lost- {teamDetails.standings[0].home.lose}
                    </p>
                    <p className="text-yellow-600">
                      Drawn- {teamDetails.standings[0].home.draw}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="font-semibold">Away stats</h2>
                    <p>Played- {teamDetails.standings[0].away.played}</p>
                    <p className="text-green-600">
                      Won- {teamDetails.standings[0].away.win}
                    </p>
                    <p className="text-red-600">
                      Lost- {teamDetails.standings[0].away.lose}
                    </p>
                    <p className="text-yellow-600">
                      Drawn- {teamDetails.standings[0].away.draw}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <hr className="my-8 border-t-4 border-gray-300" />
            <div className="flex mt-10 flex-col">
              <h2 className="text-2xl my-8 text-center font-semibold ">
                Key Players
              </h2>
              <div className="flex flex-wrap justify-center">
                {players.map((player) => (
                  <div
                    key={player.name}
                    className="flex flex-col items-center justify-center mr-4 mb-4 w-1/4 md:w-1/6 lg:w-1/12 w-"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <Image
                        src={player.photo}
                        alt={player.lastname}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-2">
                      {player.lastname.substring(
                        player.lastname.lastIndexOf(" ") + 1
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default TeamDetails;

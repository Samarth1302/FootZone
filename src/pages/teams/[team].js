import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Image from "next/image";

const TeamDetails = () => {
  const router = useRouter();
  const { team, leagueId } = router.query;
  const [teamDetails, setTeamDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (team && leagueId) {
      setLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/info/leagues/${leagueId}/teams/${team}`
      )
        .then((response) => response.json())
        .then((data) => setTeamDetails(data))
        .catch((error) => console.error("Error fetching team details:", error))
        .finally(() => setLoading(false));
    }
    console.log(teamDetails);
  }, [team, leagueId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>
          {teamDetails ? teamDetails.name : "Team Details"} - Your App Name
        </title>
        <meta name="description" content="Team Details Page" />
      </Head>

      {teamDetails && (
        <main className="container mx-auto p-4">
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
            <div className="grid grid-cols-1 gap-10">
              <div className="flex flex-col">
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
                    Stadium: {teamDetails.venue.name}
                  </p>
                  <p>{teamDetails.venue.address},</p>
                  <p>{teamDetails.venue.city}</p>
                  <p>Capacity: {teamDetails.venue.capacity}</p>
                </div>
              </div>
              {teamDetails.standings && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Stats</h2>
                  <div>
                    <div className="mb-2 flex-col flex">
                      <p className="font-medium">
                        League Rank : {teamDetails.standings[0].rank}{" "}
                      </p>
                      <p> Points: {teamDetails.standings[0].points}</p>
                      <p className="flex mr-4">
                        Form:
                        <p className="flex flex-row items-center">
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
                        </p>
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col text-base">
                        <h2 className="text-lg font-semibold">Total</h2>
                        <p>Scored-{teamDetails.standings[0].all.goals.for}</p>
                        <p>
                          Conceded-{teamDetails.standings[0].all.goals.against}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">Home</h2>
                        <p>Scored-{teamDetails.standings[0].home.goals.for}</p>
                        <p>
                          Conceded-{teamDetails.standings[0].home.goals.against}
                        </p>
                      </div>

                      <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">Away</h2>
                        <p>Scored-{teamDetails.standings[0].away.goals.for}</p>
                        <p>
                          Conceded-{teamDetails.standings[0].away.goals.against}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default TeamDetails;

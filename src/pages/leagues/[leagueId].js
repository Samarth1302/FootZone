import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Image from "next/image";

const LeagueDetails = ({ dark }) => {
  const router = useRouter();
  const { leagueId } = router.query;
  const [leagueDetails, setLeagueDetails] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredTeams, setFilteredTeams] = useState([]);

  useEffect(() => {
    if (leagueId) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/info/leagues/${leagueId}`)
        .then((response) => response.json())
        .then((data) => setLeagueDetails(data))

        .catch((error) => toast.error(error));
    }
  }, [leagueId]);
  const filterTeams = () => {
    if (leagueDetails && leagueDetails.teams) {
      if (searchInput.trim() === "") {
        setFilteredTeams(leagueDetails.teams);
      } else {
        const filtered = leagueDetails.teams.filter((team) =>
          team.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredTeams(filtered);
      }
    }
  };

  useEffect(() => {
    filterTeams();
  }, [searchInput, leagueDetails]);

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className={`min-h-screen ${
        dark ? "dark" : ""
      } bg-white dark:bg-slate-900`}
    >
      <Head>
        <title>Leagues - FootZone</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta
          name="keywords"
          content="football soccer stadium players athletes sport"
        />
        <meta name="description" content="Details for leagues" />
      </Head>

      {leagueDetails && (
        <main className="mx-auto p-4  dark:bg-slate-900">
          <button
            className="font-medium text-blue-800 inline-flex items-center mb-4 hover:bg-blue-50 rounded-lg p-2 dark:hover:bg-slate-800 dark:text-blue-200 dark:hover:text-blue-200"
            onClick={handleBack}
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

          <div className="flex flex-row items-center">
            {" "}
            <Image src={leagueDetails.logo} alt="" width={60} height={60} />
            <h1 className="ml-4 text-3xl text-blue-950 dark:text-white font-bold ">
              {leagueDetails.name}
            </h1>
          </div>
          <hr className="my-8 border-t-4 border-gray-300" />
          {leagueDetails.standings && (
            <section className="mb-8">
              <h2 className="text-2xl text-blue-900 dark:text-blue-100 font-bold mb-4">
                Points Table
              </h2>
              <table className="w-full text-xs md:text-base lg:text-xl border-2 border-gray-400">
                <thead>
                  <tr className="border-b border-t text-blue-800 dark:text-blue-300 border-gray-200">
                    <th className="text-left p-1 pb-2">&nbsp;</th>
                    <th className="text-left p-1 pb-2">
                      <abbr
                        className="no-underline"
                        title="Teams in Competition"
                      >
                        TEAM
                      </abbr>
                    </th>
                    <th className="text-center p-1 pb-2">
                      <abbr className="no-underline" title="Games Played">
                        P
                      </abbr>
                    </th>
                    <th className="text-center p-1 pb-2">
                      <abbr className="no-underline" title="Games Won">
                        W
                      </abbr>
                    </th>
                    <th className="text-center p-1 pb-2">
                      <abbr className="no-underline" title="Games Drawn">
                        D
                      </abbr>
                    </th>
                    <th className="text-center p-1 pb-2">
                      <abbr className="no-underline" title="Games Lost">
                        L
                      </abbr>
                    </th>
                    <th className="text-center p-1 pb-2 hidden md:table-cell ">
                      <abbr className="no-underline" title="Goals Scored">
                        GF
                      </abbr>
                    </th>
                    <th className="text-center p-1 pb-2 hidden md:table-cell">
                      <abbr className="no-underline" title="Goals Conceded">
                        GA
                      </abbr>
                    </th>
                    <th className="text-center p-1 pb-2">
                      <abbr className="no-underline" title="Goal Difference">
                        GD
                      </abbr>
                    </th>
                    <th className="text-center p-1 pb-2">
                      <abbr className="no-underline" title="Points">
                        Pts
                      </abbr>
                    </th>
                    <th className="text-center hidden md:table-cell p-1 pb-2 ">
                      <abbr
                        className="no-underline"
                        title="Recent form, home and away"
                      >
                        Form
                      </abbr>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leagueDetails.standings.map((team, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0
                          ? dark
                            ? "bg-slate-700"
                            : "bg-gray-100"
                          : dark
                          ? "bg-slate-800"
                          : "bg-white"
                      } dark:text-blue-100`}
                    >
                      <td className="text-left p-1 pl-2">{index + 1}</td>
                      <td className="text-left p-1 flex items-center">
                        <Image
                          src={team.team.logo}
                          alt={team.team.name}
                          width={20}
                          height={20}
                        />
                        <p className="ml-4 max-w-14 text-wrap md:text-nowrap md:max-w-60 truncate">
                          {team.team.name}
                        </p>
                      </td>
                      <td className="text-center p-1">{team.all.played}</td>
                      <td className="text-center p-1">{team.all.win}</td>
                      <td className="text-center p-1">{team.all.draw}</td>
                      <td className="text-center p-1">{team.all.lose}</td>
                      <td className="text-center p-1 hidden md:table-cell">
                        {team.all.goals ? team.all.goals.for : 0}
                      </td>
                      <td className="text-center p-1 hidden md:table-cell">
                        {team.all.goals ? team.all.goals.against : 0}
                      </td>
                      <td className="text-center p-1">{team.goalsDiff}</td>
                      <td className="text-center p-1">{team.points}</td>
                      <td className="text-center hidden md:table-cell p-1 ">
                        <div className="flex items-center justify-center">
                          {team.form.split("").map((result, i) => (
                            <div
                              key={i}
                              className={`${
                                result === "W"
                                  ? "bg-green-500"
                                  : result === "D"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              } h-3 w-1 mx-0.5 rounded-full`}
                            ></div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
          <hr className="my-8 border-t-4 border-gray-300" />
          {leagueDetails.teams.length !== 0 && (
            <section>
              <div className="px-5 pt-4 mx-auto flex flex-col md:flex-row space-y-3 justify-between items-center mb-14">
                <h2 className="text-2xl text-blue-900 dark:text-blue-100 text-left font-bold">
                  Teams
                </h2>{" "}
                <input
                  type="text"
                  placeholder="Search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="border-2 px-3 border-gray-400 dark:bg-slate-950 p-2 rounded-md dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 dark:text-blue-100">
                {filteredTeams.map((team) => (
                  <Link
                    key={team.id}
                    href={`/teams/${team.id}?leagueId=${leagueId}`}
                    legacyBehavior
                  >
                    <a className="flex flex-col items-center">
                      <Image
                        src={team.logo}
                        alt={team.name}
                        width={80}
                        height={80}
                      />
                      <span className="text-sm">{team.name}</span>
                    </a>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>
      )}
    </div>
  );
};

export default LeagueDetails;

import Image from "next/image";

export default function GroupStanding({ group, index }) {
  return (
    <div>
      <section key={index} className="pb-8 px-6 py-2">
        <h2 className="text-2xl text-blue-900 dark:text-blue-100 font-bold mb-4">
          {group.group}
        </h2>
        <table className="w-full text-base lg:text-xl border-gray-600 border-2">
          <thead>
            <tr className="border-b bg-white dark:bg-slate-900 border-t text-blue-800 dark:text-blue-300 border-gray-400">
              <th className="text-left p-1 pb-2">&nbsp;</th>
              <th className="text-left p-1 pb-2 border-r border-gray-400 md:border-none w-40 md:w-80 truncate">
                <abbr className="no-underline" title="Teams in Competition">
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
            </tr>
          </thead>
          <tbody>
            {group.teams.map((team, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-blue-100 dark:bg-slate-800"
                    : "bg-blue-50 dark:bg-slate-700"
                } dark:text-blue-100`}
              >
                <td className="text-left p-1 pl-2 md:pl-3">{index + 1}</td>
                <td className="text-left p-1 flex items-center border-r border-gray-400 md:border-none">
                  <Image
                    src={team.crest}
                    alt={team.name}
                    width={20}
                    height={20}
                  />
                  <p className="ml-4">{team.name}</p>
                </td>
                <td className="text-center p-1">{team.playedGames}</td>
                <td className="text-center p-1">{team.won}</td>
                <td className="text-center p-1">{team.draw}</td>
                <td className="text-center p-1">{team.lost}</td>
                <td className="text-center p-1 hidden md:table-cell">
                  {team.goalsFor}
                </td>
                <td className="text-center p-1 hidden md:table-cell">
                  {team.goalsAgainst}
                </td>
                <td className="text-center p-1">{team.goalDifference}</td>
                <td className="text-center p-1">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

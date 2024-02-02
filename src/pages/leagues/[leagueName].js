import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const standingsData = [
  {
    name: 'Team A',
    gamesPlayed: 10,
    gamesWon: 7,
    gamesDrawn: 2,
    gamesLost: 1,
    goalsFor: 25,
    goalsAgainst: 10,
    goalDifference: 15,
    points: 23,
    form: ['W', 'W', 'D', 'W', 'W'],
  },
  {
    name: 'Team B',
    gamesPlayed: 10,
    gamesWon: 6,
    gamesDrawn: 3,
    gamesLost: 1,
    goalsFor: 20,
    goalsAgainst: 12,
    goalDifference: 8,
    points: 21,
    form: ['D', 'W', 'W', 'D', 'W'],
  },];

const LeagueDetails = () => {
  const router = useRouter();
  const { leagueName } = router.query;
  // const [standings, setStandings] = useState([]);
  const [fixtures, setFixtures] = useState([]);

//   const fetchLeagueDetails = async () => {
//     try {
//       const standingsResponse = await fetch(`/api/standings?leagueName=${leagueName}`);
//       const fixturesResponse = await fetch(`/api/fixtures?leagueName=${leagueName}`);
      
//       const standingsData = await standingsResponse.json();
//       const fixturesData = await fixturesResponse.json();

//       setStandings(standingsData);
//       setFixtures(fixturesData);
//     } catch (error) {
//       console.error('Error fetching league details:', error);
//     }
//   };

//   useEffect(() => {
//     if (leagueName) {
//       fetchLeagueDetails();
//     }
//   }, [leagueName]);

  return (
    <div className='min-h-screen'>
      <Head>
        <title>{leagueName} - FootZone</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta
          name="keywords"
          content="football soccer stadium players athletes sport"
        />
        <meta name="description" content={`Details for ${leagueName}`} />
      </Head>

      <main className="container mx-auto p-4">
      <Link href="/league" legacyBehavior>
          <a className="font-medium text-blue-800 inline-flex items-center mb-4 hover:bg-blue-50 rounded-sm p-2">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
            Back to League List
          </a>
        </Link>
        <h1 className="text-3xl text-blue-950 font-bold mb-4">{leagueName}</h1>

        <section className="mb-8">
          <h2 className="text-2xl text-blue-900 font-bold mb-4">Standings</h2>
          <table className="w-full text-base">
            <thead>
              <tr className="border-b text-blue-800 border-gray-200">
                <th className="text-left p-1 pb-2">&nbsp;</th>
                <th className="text-left p-1 pb-2"><abbr className="no-underline" title="Teams in Competition">TEAM</abbr></th>
                <th className="text-center p-1 pb-2"><abbr className="no-underline" title="Games Played">P</abbr></th>
                <th className="text-center p-1 pb-2"><abbr className="no-underline" title="Games Won">W</abbr></th>
                <th className="text-center p-1 pb-2"><abbr className="no-underline" title="Games Drawn">D</abbr></th>
                <th className="text-center p-1 pb-2"><abbr className="no-underline" title="Games Lost">L</abbr></th>
                <th className="text-center p-1 pb-2 hidden md:table-cell "><abbr className="no-underline" title="Goals Scored">GF</abbr></th>
                <th className="text-center p-1 pb-2 hidden md:table-cell"><abbr className="no-underline" title="Goals Conceded">GA</abbr></th>
                <th className="text-center p-1 pb-2"><abbr className="no-underline" title="Goal Difference">GD</abbr></th>
                <th className="text-center p-1 pb-2"><abbr className="no-underline" title="Points">Pts</abbr></th>
                <th className="text-center hidden md:table-cell p-1 pb-2 "><abbr className="no-underline" title="Recent form, home and away">Form</abbr></th>
              </tr>
            </thead>
            <tbody >
              {standingsData.map((team, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="text-left p-1">{index + 1}</td>
                  <td className="text-left p-1">{team.name}</td>
                  <td className="text-center p-1">{team.gamesPlayed}</td>
                  <td className="text-center p-1">{team.gamesWon}</td>
                  <td className="text-center p-1">{team.gamesDrawn}</td>
                  <td className="text-center p-1">{team.gamesLost}</td>
                  <td className="text-center p-1 hidden md:table-cell">{team.goalsFor}</td>
                  <td className="text-center p-1 hidden md:table-cell">{team.goalsAgainst}</td>
                  <td className="text-center p-1">{team.goalDifference}</td>
                  <td className="text-center p-1">{team.points}</td>
                  <td className="text-center hidden md:table-cell p-1 ">
                    <div className="flex items-center justify-center">
                      {team.form.map((result, i) => (
                        <div
                          key={i}
                          className={`${result === 'W' ? 'bg-green-500' : 'bg-red-500'} h-3 w-1 mx-0.5 rounded-full`}
                        ></div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-2xl text-blue-900 font-bold mb-4">Fixtures</h2>
          {fixtures.map((fixture, index) => (
            <div key={index} className="mb-2">
              {fixture.date} - {fixture.homeTeam} vs {fixture.awayTeam}
            </div>
          ))}
        </section>

       
      </main>
    </div>
  );
};

export default LeagueDetails;

import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const LeagueDetails = () => {
  const router = useRouter();
  const { leagueName } = router.query;
  const [standings, setStandings] = useState([]);
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
    <div>
      <Head>
        <title>{leagueName}</title>
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
        <h1 className="text-3xl font-bold mb-4">{leagueName} Details</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Standings</h2>
          {standings.map((team, index) => (
            <div key={index} className="mb-2">
              {team.teamName} - Points: {team.points}
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fixtures</h2>
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

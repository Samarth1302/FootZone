import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

const leagues = [
    {
        imageUrl: 'https://media.api-sports.io/football/leagues/2.png',
        name: 'Premier League',
        description: 'The top professional football league in England.',
      },
      {
        imageUrl: 'https://media.api-sports.io/football/leagues/2.png',
        name: 'La Liga',
        description: 'The top professional football league in Spain.',
      },
      {
        imageUrl: 'https://media.api-sports.io/football/leagues/2.png',
        name: 'Bundesliga',
        description: 'The top professional football league in Germany.',
      },
  ];
const League = (/*{ leagues }*/) => {
  return (
    <div>
      <Head>
        <title>Leagues - FootZone</title>
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
    <section className="text-gray-600 body-font">
    <h1 className='text-3xl font-bold mb-4 text-blue-900'></h1>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {leagues.map((league, index) => (
            <Link key={index} href={`/leagues/${league.name}`} legacyBehavior>
            <a className="p-4 md:w-1/2 lg:w-1/4 block">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:bg-slate-300 hover:bg-opacity-20">
              <Image
  src={league.imageUrl} 
  alt={league.name} 
  width={150}
  height={150}
  className="object-cover object-center mx-auto p-3"
/>

                <div className="p-6">
                 
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{league.name}</h1>
                  <p className="leading-relaxed mb-3">{league.description}</p>
                  <div className="flex items-center flex-wrap">
                  
                  </div>
                </div>
              </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default League;

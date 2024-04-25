import React from "react";
import Head from "next/head";

const Credits = ({ dark }) => {
  return (
    <div className={`${dark ? "dark" : ""} min-h-screen`}>
      <Head>
        <title>Credits - FootZone</title>
        <meta
          name="keywords"
          content="e-commerce, shopping, online shopping, Carterz"
        />
      </Head>
      <div className="bg-gray-100 min-h-screen dark:bg-slate-800">
        <header className="py-4 px-4 dark:bg-slate-900">
          <div className="container mx-auto">
            <h1 className="text-3xl font-semibold dark:text-white text-black">
              Credits
            </h1>
          </div>
        </header>

        <main className="container mx-auto py-8">
          <section className="bg-white rounded-lg p-6 shadow-md dark:bg-slate-900 dark:text-white">
            <p>
              FootZone utilizes various APIs and data sources, including
              Football-Data.org, API-Football, and News API, to provide
              up-to-date football information and news.
            </p>
            <br />
            <p>
              The UI components and designs are inspired by Tailblocks and
              Shadcn, contributing to the website's visually appealing and
              user-friendly interface.
            </p>
            <br />
            <p>
              The website is built using Next.js for efficient and fast
              performance, with MongoDB providing a free cloud database
              solution. Node.js and Express.js power the backend, while Botpress
              is integrated for bot interactions. Deployment is made easy with
              Vercel and Render.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Credits;

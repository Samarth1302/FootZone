import React from "react";
import Head from "next/head";

const About = ({ dark }) => {
  return (
    <div className={`${dark ? "dark" : ""} bg-gray-100 min-h-screen`}>
      <Head>
        <title>About Us - FootZone</title>
        <meta
          name="keywords"
          content="e-commerce, shopping, online shopping, Carterz"
        />
      </Head>
      <div className="bg-gray-100 min-h-screen dark:bg-slate-800">
        <header className="py-4 px-4  dark:bg-slate-900">
          <div className="container mx-auto">
            <h1 className="text-3xl font-semibold dark:text-white text-black">
              About Us
            </h1>
          </div>
        </header>

        <main className="container mx-auto py-8">
          <section className="bg-white rounded-lg p-6 shadow-md dark:bg-slate-900 dark:text-white">
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p>
              At FootZone, our mission is to provide football fans with a
              platform where they can connect, engage, and celebrate the
              beautiful game. We aim to deliver comprehensive coverage,
              insightful analysis, and engaging content to keep our audience
              informed and entertained.
            </p>
          </section>
          <section className="bg-white rounded-lg p-6 shadow-md mt-4 dark:bg-slate-900 dark:text-white">
            <h2 className="text-xl font-semibold mb-2">Developer</h2>
            <p>
              This website was built by Samarth Chauhan as a final year project
              for his college while working as an intern. It speaks volumes
              about his love for football and coding and how he managed to
              combine both of them in a unique way.
            </p>
          </section>

          <section className="bg-white rounded-lg p-6 shadow-md mt-4 dark:bg-slate-900 dark:text-white">
            <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
            <p>
              Have questions, feedback, or suggestions? We'd love to hear from
              you! Feel free to reach out to me via email at
              samarth.chauhan13022002@gmail.com .
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default About;

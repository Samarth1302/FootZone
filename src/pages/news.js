import React, { useState, useEffect } from "react";
import Head from "next/head";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const News = ({ dark }) => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/news/all`
      );
      const data = await response.json();
      setNews(data);
    } catch (err) {
      toast.error(err, {
        position: "top-left",
        toastId: "newserr",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: dark ? "dark" : "light",
      });
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className={`min-h-screen ${dark ? "dark" : ""} dark:bg-slate-900`}>
      <Head>
        <title>News - FootZone</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Latest news articles" />
      </Head>
      {news && (
        <section className="text-gray-600 body-font dark:bg-slate-900">
          <div className="px-5 py-8 md:py-12 mx-auto">
            <h1 className="text-lg  md:text-3xl font-bold  text-blue-900 dark:text-white mb-14">
              Latest Football News
            </h1>
            <div className="flex flex-wrap -m-4">
              {news.map((article, index) => (
                <div
                  key={index}
                  className="p-4 md:w-1/2 lg:w-1/3 dark:text-blue-100"
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="border rounded-lg overflow-hidden hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-blue-100">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="object-cover object-center w-full h-full"
                      />
                      <div className="p-6">
                        <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-100 mb-3">
                          {article.title}
                        </h2>
                        <p className="text-sm font-medium text-sky-900 dark:text-blue-200">
                          {article.description}
                        </p>
                        <p className="mt-2 text-sm font-bold text-gray-500 dark:text-slate-500">
                          {formatDate(article.publishedAt)}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default News;

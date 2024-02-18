import React, { useState, useEffect } from "react";
import Head from "next/head";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const News = () => {
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
        theme: "light",
      });
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <title>News - FootZone</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Latest news articles" />
      </Head>
      {news && (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-12 mx-auto">
            <h1 className="text-3xl font-bold  text-blue-900 mb-14">
              Latest Football News
            </h1>
            <div className="flex flex-wrap -m-4">
              {news.map((article, index) => (
                <div key={index} className="p-4 md:w-1/2 lg:w-1/3">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="border rounded-lg overflow-hidden hover:bg-gray-100">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="object-cover object-center w-full h-full"
                      />
                      <div className="p-6">
                        <h2 className="text-lg font-semibold text-blue-800 mb-3">
                          {article.title}
                        </h2>
                        <p className="text-sm font-medium text-sky-900">
                          {article.description}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
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

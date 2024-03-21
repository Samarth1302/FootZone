import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Loader = ({ dark }) => (
  <div
    className={`${
      dark ? "dark" : ""
    } fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex items-center justify-center bg-black opacity-60 dark:opacity-80`}
  >
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-200"></div>
  </div>
);

const DEFAULT_LOADING_DURATION = 1000;

export default function RouteLoader({ dark }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      setLoading(true);
      setTimeout(() => setLoading(false), DEFAULT_LOADING_DURATION);
    };
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    const handleBeforeUnload = () => setLoading(true);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return loading ? <Loader dark={dark} /> : null;
}

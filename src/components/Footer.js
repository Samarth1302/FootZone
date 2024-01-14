import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const [foot, setFoot] = useState(true);

  useEffect(() => {
    let nonFoot = [];
    if (nonFoot.includes(router.pathname)) {
      setFoot(false);
    }
  }, []);

  return (
    <>
      {foot && (
        <div className="flex flex-col md:flex-row md:justify-center justify-center text-center py-2 shadow-md sticky text-blue-400 top-0 z-0 pb-6 bg-slate-700">
          Copyright @2024
        </div>
      )}
    </>
  );
};

export default Footer;

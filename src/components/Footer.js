import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = ({ dark }) => {
  const router = useRouter();
  const [foot, setFoot] = useState(true);

  useEffect(() => {
    let nonFoot = ["/signup", "/login"];
    if (nonFoot.includes(router.pathname)) {
      setFoot(false);
    } else {
      setFoot(true);
    }
  }, [router]);

  return (
    <>
      {foot && (
        <footer
          className={`flex flex-col gap-2 sm:flex-row py-4 font-semibold w-full items-center px-3 md:px-6 border-t ${
            dark ? "dark" : ""
          } ${dark ? "bg-black" : "bg-blue-200"}`}
        >
          <p className={`text-base text-black dark:text-white`}>
            © 2024 FootZone. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-base text-black hover:underline underline-offset-4 dark:text-white"
              href="/about"
            >
              About
            </Link>
            <Link
              className="text-base text-black hover:underline underline-offset-4 dark:text-white"
              href="/credit"
            >
              Credits
            </Link>

            <Link
              className="text-base text-black hover:underline underline-offset-4 dark:text-white"
              href="/privacy"
            >
              Privacy
            </Link>
          </nav>
        </footer>
      )}
    </>
  );
};

export default Footer;

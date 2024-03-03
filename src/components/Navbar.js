import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { FiAlignJustify } from "react-icons/fi";
import { MdOutlineLightMode } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

const Navbar = ({ user, logout, dark, setDark, currentPath }) => {
  const [sidebar, setSidebar] = useState(false);
  const [hamMenu, setHam] = useState(false);
  const [hamHovered, setHamHovered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleHam = () => {
    setHam(!hamMenu);
    setSidebar(false);
  };

  const handleToggle = () => {
    setDark(!dark);
  };

  return (
    <>
      <div
        className={`flex sticky flex-col md:justify-start sm:justify-center items-start border-blue-50 py-2 shadow-md top-0 z-40 pb-3 pt-4 ${
          dark ? "dark" : ""
        } ${dark ? "bg-black" : "bg-blue-200"}  ${
          !sidebar && "overflow-hidden"
        }`}
      >
        <div className="relative left-5 mx-2 flex content-end md:mx-2">
          <div className="text-2xl items-center mr-5">
            <FiAlignJustify
              className={`text-lg md:text-2xl ${hamHovered ? "hovered" : ""}`}
              style={{
                color: hamHovered
                  ? dark
                    ? "#1d4ed8"
                    : "#177abf"
                  : dark
                  ? "#46adec"
                  : "#172554",
                cursor: "pointer",
              }}
              onClick={toggleHam}
              onMouseOver={() => setHamHovered(true)}
              onMouseLeave={() => setHamHovered(false)}
            />
            {hamMenu && (
              <aside
                id="sidebar-multi-level-sidebar"
                className={`fixed top-0 left-0 z-50 w-32 md:w-44 h-screen transition-transform -translate-x-full sm:translate-x-0 left-ham-menu ${
                  hamMenu ? "translate-x-0" : ""
                }`}
                aria-label="Sidebar"
              >
                <div
                  className={`h-full px-3 py-4 overflow-y-auto ${
                    dark ? "bg-slate-950" : "bg-blue-50"
                  }`}
                >
                  <span
                    onClick={toggleHam}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="absolute top-5 right-2 cursor-pointer text-base"
                  >
                    <IoClose
                      size={isHovered ? 23 : 20}
                      style={{
                        color: isHovered
                          ? dark
                            ? "#ff5252"
                            : "red"
                          : dark
                          ? "#ffffff"
                          : "#172554",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </span>
                  <ul className="space-y-4 mt-10 text-center justify-evenly text-base md:text-lg font-semibold dark:text-white">
                    <Link href={"/"}>
                      <li
                        className={`my-2 hover:bg-blue-100 hover:text-blue-900 dark:hover:bg-slate-900 dark:hover:text-blue-200 rounded-md ${
                          currentPath == "/" &&
                          "bg-blue-900 text-white dark:bg-blue-100 dark:text-slate-900 hover:bg-blue-900  hover:text-white hover:dark:bg-blue-100 hover:dark:text-slate-900"
                        }`}
                      >
                        Home
                      </li>
                    </Link>
                    <Link href={"/league"}>
                      <li
                        className={`my-2 hover:bg-blue-100 hover:text-blue-900 dark:hover:bg-slate-900 dark:hover:text-blue-200 rounded-md ${
                          currentPath === "/league" &&
                          "bg-blue-900 text-white dark:bg-blue-100 dark:text-slate-900 hover:bg-blue-900  hover:text-white hover:dark:bg-blue-100 hover:dark:text-slate-900"
                        }`}
                      >
                        Leagues
                      </li>
                    </Link>
                    {user.user_id && (
                      <Link href={"/team"}>
                        <li
                          className={`my-2 hover:bg-blue-100 hover:text-blue-900 dark:hover:bg-slate-900 dark:hover:text-blue-200 rounded-md ${
                            currentPath === "/team" &&
                            "bg-blue-900 text-white dark:bg-blue-100 dark:text-slate-900 hover:bg-blue-900  hover:text-white hover:dark:bg-blue-100 hover:dark:text-slate-900"
                          }`}
                        >
                          Teams
                        </li>
                      </Link>
                    )}
                    <Link href={"/news"}>
                      <li
                        className={`my-2 hover:bg-blue-100 hover:text-blue-900 dark:hover:bg-slate-900 dark:hover:text-blue-200 rounded-md ${
                          currentPath === "/news" &&
                          "bg-blue-900 text-white dark:bg-blue-100 dark:text-slate-900 hover:bg-blue-900  hover:text-white hover:dark:bg-blue-100 hover:dark:text-slate-900"
                        }`}
                      >
                        News
                      </li>
                    </Link>
                    {user.user_id && (
                      <Link href={"/security"}>
                        <li
                          className={`my-2 hover:bg-blue-100 hover:text-blue-900 dark:hover:bg-slate-900 dark:hover:text-blue-200 rounded-md ${
                            currentPath === "/security" &&
                            "bg-blue-900 text-white dark:bg-blue-100 dark:text-slate-900 hover:bg-blue-900  hover:text-white hover:dark:bg-blue-100 hover:dark:text-slate-900"
                          }`}
                        >
                          Security
                        </li>
                      </Link>
                    )}
                    {user.user_id && (
                      <Link href={"/"}>
                        <li
                          className={`my-2 hover:text-red-600 hover:bg-blue-100  dark:hover:bg-slate-900 rounded-md ${
                            currentPath === "/logout" && "font-bold"
                          }`}
                          onClick={logout}
                        >
                          Logout
                        </li>
                      </Link>
                    )}
                  </ul>
                </div>
              </aside>
            )}
          </div>
          <Link href={"/"}>
            <div className={hamMenu ? "ml-32 hidden md:block" : ""}>
              {dark ? (
                <Image
                  src="/dark-logo.png"
                  alt="FootZone logo"
                  width={140}
                  height={140}
                  priority
                />
              ) : (
                <Image
                  src="/logo.png"
                  alt="FootZone logo"
                  width={140}
                  height={140}
                  priority
                />
              )}
            </div>
          </Link>
        </div>
        <div className="items-center text-xs md:text-sm absolute right-2 md:right-4 top-2 md:top-3 ml-72 flex">
          <div className="mr-4 md:mr-8">
            <label
              htmlFor="switch"
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="switch"
                className="hidden"
                onChange={handleToggle}
                checked={dark}
              />
              {dark && <MdOutlineLightMode style={{ color: "white" }} />}
              <div className="mx-1 md:mx-2 w-7 h-4 md:w-10 md:h-6 bg-white dark:bg-blue-950 rounded-full p-1 flex items-center text-xs  md:text-sm">
                <div
                  className={`w-3 h-3 md:w-4 md:h-4 bg-slate-400 dark:bg-black rounded-full shadow-md transform transition-all duration-300 ${
                    dark ? "translate-x-2 md:translate-x-4" : "translate-x-0"
                  }`}
                ></div>
              </div>
              {!dark && <IoMdMoon />}
            </label>
          </div>
          {user.user_id && (
            <div className="md:-mt-1">
              <span className="flex text-base md:text-xl flex-col">
                <div className="ml-1 md:ml-0">
                  <MdAccountCircle
                    style={{ color: dark ? "white" : "#172554" }}
                  />
                </div>
                <p className="text-xs -ml-1 font-semibold text-slate-950 dark:text-white dark:font-medium">
                  {user.username}
                </p>
              </span>
            </div>
          )}
          {!user.user_id && (
            <Link href={"/login"}>
              <button className="bg-blue-950 px-2 py-1 rounded-md text-xs md:text-sm hover:bg-blue-900  focus:bg-white dark:focus:bg-slate-900 focus:border-2 focus:border-blue-950 focus:text-blue-950 dark:focus:text-white font-medium text-white ">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

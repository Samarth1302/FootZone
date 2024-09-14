import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoHomeOutline, IoFootballOutline } from "react-icons/io5";
import {
  MdAccountCircle,
  MdOutlineLightMode,
  MdOutlineLogout,
  MdSecurity,
} from "react-icons/md";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdMoon, IoMdCloseCircle } from "react-icons/io";
import { TbSoccerField } from "react-icons/tb";
import { RiTeamLine } from "react-icons/ri";
import { TiNews } from "react-icons/ti";
import { FaShoppingBag } from "react-icons/fa";
import { GiSoccerKick } from "react-icons/gi";

const Navbar = ({
  user,
  sidebar,
  setSidebar,
  logout,
  dark,
  setDark,
  currentPath,
  isMobile,
}) => {
  const [hamHovered, setHamHovered] = useState(false);

  const toggleHam = () => {
    setSidebar(!sidebar);
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
            {sidebar && (
              <aside
                id="sidebar-multi-level-sidebar"
                className={`fixed top-0 left-0 z-50 w-28 md:w-40 h-screen transition-transform -translate-x-full sm:translate-x-0 ${
                  sidebar ? "translate-x-0" : ""
                }`}
                aria-label="Sidebar"
              >
                <div
                  className={`h-full px-3 py-4 sidemenu overflow-y-scroll ${
                    dark ? "bg-slate-950" : "bg-blue-50"
                  }`}
                >
                  <IoMdCloseCircle
                    onClick={toggleHam}
                    className="absolute top-5 right-2 cursor-pointer text-lg md:text-xl dark:text-white text-black hover:text-red-500 dark:hover:text-red-600"
                  />
                  <ul className="space-y-2 flex flex-col mt-10 pl-2 md:pl-4 text-center text-sm font-light md:text-lg md:font-medium dark:text-white ">
                    <Link href={"/"}>
                      <li
                        className={`my-2 flex items-center rounded-md ${
                          currentPath === "/"
                            ? "text-slate-500"
                            : "hover:text-blue-600"
                        }`}
                      >
                        <IoHomeOutline className="mr-3" />
                        Home
                      </li>
                    </Link>
                    <Link href={"/league"} className="hidden">
                      <li
                        className={`my-2 flex items-center rounded-md ${
                          currentPath === "/league"
                            ? "text-slate-500"
                            : "hover:text-blue-600"
                        }`}
                      >
                        <TbSoccerField className="mr-2" />
                        Leagues
                      </li>
                    </Link>
                    <Link href={"/stat"} className="hidden">
                      <li
                        className={`my-2 flex items-center rounded-md ${
                          currentPath === "/stat"
                            ? "text-slate-500"
                            : "hover:text-blue-600 "
                        }`}
                      >
                        <GiSoccerKick className="mr-3" />
                        Stats
                      </li>
                    </Link>
                    <Link href={"/match"}>
                      <li
                        className={`my-2 flex items-center rounded-md ${
                          currentPath === "/match"
                            ? "text-slate-500"
                            : "hover:text-blue-600 "
                        }`}
                      >
                        <IoFootballOutline className="mr-3" />
                        Fixtures
                      </li>
                    </Link>
                    <Link href={"/team"} className="hidden">
                      <li
                        className={`my-2 flex items-center rounded-md ${
                          currentPath === "/team"
                            ? "text-slate-500"
                            : "hover:text-blue-600 "
                        }`}
                      >
                        <RiTeamLine className="mr-3" />
                        Teams
                      </li>
                    </Link>
                    <Link href={"/news"}>
                      <li
                        className={`my-2 flex items-center rounded-md ${
                          currentPath === "/news"
                            ? "text-slate-500"
                            : "hover:text-blue-600 "
                        }`}
                      >
                        <TiNews className="mr-2" />
                        News
                      </li>
                    </Link>
                    {user.user_id && (
                      <Link href={"/shop"}>
                        <li
                          className={`my-2 flex items-center rounded-md ${
                            currentPath === "/shop"
                              ? "text-slate-500"
                              : "hover:text-blue-600 "
                          }`}
                        >
                          <FaShoppingBag className="mr-3" />
                          Shop
                        </li>
                      </Link>
                    )}
                    {user.user_id && (
                      <Link href={"/security"}>
                        <li
                          className={`my-2 flex items-center rounded-md ${
                            currentPath === "/security"
                              ? "text-slate-500"
                              : "hover:text-blue-600 "
                          }`}
                        >
                          <MdSecurity className="mr-3" />
                          Security
                        </li>
                      </Link>
                    )}
                    {user.user_id && (
                      <Link href={"/"}>
                        <li
                          className={`my-2 flex items-center hover:text-red-600 rounded-md ${
                            currentPath === "/logout" && "font-bold"
                          }`}
                          onClick={logout}
                        >
                          <MdOutlineLogout className="mr-3" />
                          Logout
                        </li>
                      </Link>
                    )}
                  </ul>
                  <p className="text-red-500 font-semibold text-sm flex-wrap mt-10 text-center">
                    Currently under maintenance, limited features available
                  </p>
                </div>
              </aside>
            )}
          </div>
          <Link href={"/"}>
            <div className={sidebar ? "ml-32 hidden md:block" : ""}>
              {dark ? (
                <Image
                  src="/dark-logo.png"
                  alt="FootZone logo"
                  width={isMobile ? 95 : 140}
                  height={isMobile ? 95 : 140}
                  priority
                />
              ) : (
                <Image
                  src="/logo.png"
                  alt="FootZone logo"
                  width={isMobile ? 95 : 140}
                  height={isMobile ? 95 : 140}
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
              {dark && <MdOutlineLightMode style={{ color: "#93c5fd" }} />}
              <div className="mx-1 md:mx-2 w-7 h-4 md:w-10 md:h-6 bg-white dark:bg-blue-950 rounded-full p-1 flex items-center text-xs  md:text-sm">
                <div
                  className={`w-3 h-3 md:w-4 md:h-4 bg-blue-200 dark:bg-black rounded-full shadow-md transform transition-all duration-300 ${
                    dark ? "translate-x-2 md:translate-x-4" : "translate-x-0"
                  }`}
                ></div>
              </div>
              {!dark && <IoMdMoon style={{ color: "#172554" }} />}
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
                <p className="text-xs -ml-1 font-semibold text-slate-950 dark:text-white dark:font-medium max-w-10 truncate">
                  <abbr className="no-underline" title={user.username}>
                    {user.username}
                  </abbr>
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

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { FiAlignJustify } from "react-icons/fi";

const Navbar = ({ user, logout, dark }) => {
  const [sidebar, setSidebar] = useState(false);
  const [hamMenu, setHam] = useState(false);
  const [hamHovered, setHamHovered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleHam = () => {
    setHam(!hamMenu);
    setSidebar(false);
  };

  return (
    <>
      <div
        className={`flex sticky flex-col md:justify-start sm:justify-center items-start border-blue-50 py-2 shadow-md top-0 z-40 pb-3 pt-4 bg-blue-200  ${
          !sidebar && "overflow-hidden"
        }`}
      >
        <div className="relative left-5 mx-2 flex content-end md:mx-2">
          <div className="text-2xl items-center mr-5">
            <FiAlignJustify
              className={`text-lg md:text-2xl ${hamHovered ? "hovered" : ""}`}
              style={{
                color: hamHovered ? "#177abf" : "#172554",
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
                <div className="h-full px-3 py-4 overflow-y-auto bg-blue-50">
                  <span
                    onClick={toggleHam}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="absolute top-5 right-2 cursor-pointer text-base"
                  >
                    <IoClose
                      size={isHovered ? 23 : 20}
                      style={{
                        color: isHovered ? "red" : "#172554",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </span>
                  <ul className="space-y-4 mt-10 text-center justify-evenly text-base md:text-lg font-semibold">
                    {" "}
                    {true && (
                      <Link href={"/"}>
                        <li className="my-2  hover:bg-blue-100 hover:text-blue-900 rounded-md">
                          Home
                        </li>
                      </Link>
                    )}
                    {true && (
                      <Link href={"/league"}>
                        <li className="my-2 hover:bg-blue-100 hover:text-blue-900 rounded-md">
                          Soccer
                        </li>
                      </Link>
                    )}
                    {true && (
                      <Link href={"/news"}>
                        <li className="my-2 hover:bg-blue-100 hover:text-blue-900 rounded-md">
                          News
                        </li>
                      </Link>
                    )}
                    {user.user_id && (
                      <Link href={"/"}>
                        <li
                          className="my-2 hover:text-red-600 hover:bg-blue-100 rounded-md "
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
              <Image
                src="/logo.png"
                alt="FootZone logo"
                width={140}
                height={140}
              />
            </div>
          </Link>
        </div>
        <div className="items-center cursor-pointer absolute right-2 md:right-4 top-2 md:top-4 ml-72 flex">
          {user.user_id && (
            <div className="-mt-1">
              <span className="flex text-base md:text-xl flex-col">
                <MdAccountCircle style={{ color: "#172554" }} />
                <p className="text-sm md:text-sm -ml-1 font-semibold text-black">
                  {user.username}
                </p>
              </span>
            </div>
          )}
          {!user.user_id && (
            <Link href={"/login"}>
              <button className="bg-blue-950 px-2 py-1 rounded-md text-sm hover:bg-blue-900  focus:bg-white focus:border-2 focus:border-blue-950 focus:text-blue-950 font-medium text-white ">
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

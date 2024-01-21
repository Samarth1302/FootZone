import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { FiAlignJustify } from "react-icons/fi";
import { useRouter } from "next/router";

const Navbar = ({ user, logout }) => {
  const [sidebar, setSidebar] = useState(false);
  const router = useRouter();
  const [hamMenu, setHam] = useState(false);
  const [hamHovered, setHamHovered] = useState(false);

  const toggleHam = () => {
    setHam(!hamMenu);
    setSidebar(false);
  };

  const iconStyle = {
    color: "#177abf",
    marginTop: "-8px",
  };

  return (
    <>
      <div
        className={`flex flex-col md:justify-start sm:justify-center items-start border-blue-50 py-2 shadow-md top-0 z-40 pb-3 pt-4 bg-blue-100  ${
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
                className={`fixed top-0 left-0 z-50 w-44 h-screen transition-transform -translate-x-full sm:translate-x-0 left-ham-menu ${
                  hamMenu ? "translate-x-0" : ""
                }`}
                aria-label="Sidebar"
              >
                <div className="h-full px-3 py-4 overflow-y-auto bg-blue-50">
                  <span
                    onClick={toggleHam}
                    className="absolute top-5 right-2 cursor-pointer text-base"
                  >
                    <AiOutlineCloseCircle
                      size={30}
                      style={{ color: "#172554" }}
                    />
                  </span>
                  <ul className="space-y-6 mt-10 text-center justify-evenly text-lg text-blue-900 font-medium">
                    {" "}
                    {user.user_id && (
                      <Link href={"/"}>
                        <li
                          className="my-3 hover:text-blue-900 hover:bg-blue-200 rounded-full "
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
            <div className={hamMenu ? "ml-32" : ""}>
              <Image
                src="/logo.png"
                alt="FootZone logo"
                width={160}
                height={100}
              />
            </div>
          </Link>
        </div>
        <div className="items-center cursor-pointer absolute right-2 md:right-4 top-4 ml-72 flex">
          {user.user_id && (
            <div className="-mt-1">
              <span className="flex text-base md:text-xl flex-col">
                <MdAccountCircle style={{ color: "#172554" }} />
                <p className="text-xs md:text-sm -ml-2 font-medium text-blue-950">
                  {user.username}
                </p>
              </span>
            </div>
          )}
          {!user.user_id && (
            <button className="bg-blue-950 px-2 py-1 rounded-md text-sm hover:bg-blue-900  focus:bg-white focus:border-2 focus:border-blue-950 focus:text-blue-950 font-bold text-white ">
              <Link href={"/login"}>Login</Link>
            </button>
          )}{" "}
        </div>
      </div>
    </>
  );
};

export default Navbar;

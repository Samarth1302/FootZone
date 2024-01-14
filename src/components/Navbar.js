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
    color: "white",
    marginTop: "-8px",
  };

  return (
    <>
      <div
        className={`flex flex-col md:justify-start sm:justify-center items-start border-blue-50 py-2 shadow-md sticky top-0 z-40 pb-4 pt-4 bg-black opacity-95 ${
          !sidebar && "overflow-hidden"
        }`}
      >
        <div className="relative left-5 mx-2 flex content-end md:mx-2">
          <div className="text-3xl items-center py-1 mr-5">
            <FiAlignJustify
              className={`text-xl md:text-3xl ${hamHovered ? "hovered" : ""}`}
              style={{
                color: hamHovered ? "white" : "#ADD8E6",
                cursor: "pointer",
              }}
              onClick={toggleHam}
              onMouseOver={() => setHamHovered(true)}
              onMouseLeave={() => setHamHovered(false)}
            />
            {hamMenu && (
              <aside
                id="sidebar-multi-level-sidebar"
                className={`fixed top-0 left-0 z-50 w-56 h-screen transition-transform -translate-x-full sm:translate-x-0 left-ham-menu ${
                  hamMenu ? "translate-x-0" : ""
                }`}
                aria-label="Sidebar"
              >
                <div className="h-full px-3 py-4 overflow-y-auto bg-blue-900">
                  <span>
                    <p className="text-white text-xl font-medium justify-center text-center mt-1 mr-10">
                      Jump to
                    </p>
                  </span>
                  <span
                    onClick={toggleHam}
                    className="absolute top-5 right-2 cursor-pointer text-2xl"
                  >
                    <AiOutlineCloseCircle
                      size={30}
                      style={{ color: "white" }}
                    />
                  </span>
                </div>
              </aside>
            )}
          </div>
          <Link href={"/"}>
            <div className={hamMenu ? "ml-40" : ""}>
              <Image
                src="/logo.png"
                alt="FootZone logo"
                width={120}
                height={90}
              />
            </div>
          </Link>
        </div>
        <div className="items-center cursor-pointer absolute md:right-16 md:top-5 sm:top-6 sm:right-0 ml-56 flex">
          {user.email && (
            <div>
              <MdAccountCircle
                className="text-xl mt-0 mx-4 mr-6 md:text-2xl"
                style={iconStyle}
              />
              <p className="text-center justify-center text-orange-300 text-xs">
                {user.username}
              </p>
            </div>
          )}
          {!user.email && (
            <button className="bg-blue-100 px-2 md:py-1 rounded-md text-sm  font-bold text-black mx-4">
              <Link href={"/login"}>Login</Link>
            </button>
          )}{" "}
        </div>
      </div>
    </>
  );
};

export default Navbar;

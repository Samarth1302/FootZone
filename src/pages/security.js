import React, { useRef, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Image from "next/image";

const ChangePassword = ({ dark }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const buttonRef = useRef(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") setCurrentPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const togglePasswordVisibility = (passwordType) => {
    switch (passwordType) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const handleChangePassword = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("myUser"));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/pass/change`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );
      const data = await response.json();
      if (data.success == true) {
        toast.success(data.message, {
          position: "top-left",
          toastId: "changesuccess",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: dark ? "dark" : "light",
        });
        router.push("/");
      } else {
        toast.error(data.error, {
          position: "top-left",
          toastId: "changesuccess",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: dark ? "dark" : "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-left",
        toastId: "changesuccess",
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

  return (
    <div className={dark ? "dark" : ""}>
      <Head>
        <title>Change Password - FootZone</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta
          name="keywords"
          content="football soccer stadium players athletes sport"
        />
      </Head>
      <section className="relative h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center z-0 opacity-85">
          <Image
            src="/stad.jpg"
            alt="Change Password Image"
            className="w-full h-full object-cover"
            width={1920}
            height={500}
            quality={100}
          />
        </div>

        <form
          onSubmit={handleChangePassword}
          className="md:w-96 sm:w-72 bg-white dark:bg-black bg-opacity-60 dark:bg-opacity-80 border-2 border-black dark:border-white rounded-lg shadow space-y-1 p-8 relative z-10"
          method="POST"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              buttonRef.current.focus();
              handleSubmit(e);
            }
          }}
        >
          <h1 className="text-xl text-center text-black font-semibold dark:text-white leading-tight tracking-tight text-orange-5 md:text-2xl pb-4">
            Change Password
          </h1>

          <div>
            <label
              htmlFor="currentPassword"
              className="block mt-4 mb-2 text-sm font-bold text-black dark:text-white"
            >
              Current password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                id="currentPassword"
                value={currentPassword}
                className="bg-white dark:bg-slate-900 border-black dark:border-white border-2 font-semibold text-lg text-black dark:text-white sm:text-sm rounded-lg focus:ring-primary-600 placeholder-blue-200 dark:placeholder-gray-100 dark:placeholder:opacity-30 focus:border-primary-600 block w-full p-2.5"
                required
              />
              <span
                onClick={() => togglePasswordVisibility("current")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center leading-5 text-xl cursor-pointer"
              >
                {showCurrentPassword ? (
                  <AiFillEye style={{ color: dark ? "white" : "#172554" }} />
                ) : (
                  <AiFillEyeInvisible
                    style={{ color: dark ? "white" : "#172554" }}
                  />
                )}
              </span>
            </div>
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block mb-2 mt-4 text-sm font-bold text-black dark:text-white"
            >
              New password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={newPassword}
                className="bg-white dark:bg-slate-900 border-black dark:border-white border-2 font-semibold text-lg text-black dark:text-white sm:text-sm rounded-lg focus:ring-primary-600 placeholder-blue-200 dark:placeholder-gray-100 dark:placeholder:opacity-30 focus:border-primary-600 block w-full p-2.5"
                required
              />
              <span
                onClick={() => togglePasswordVisibility("new")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center leading-5 text-xl cursor-pointer"
              >
                {showNewPassword ? (
                  <AiFillEye style={{ color: dark ? "white" : "#172554" }} />
                ) : (
                  <AiFillEyeInvisible
                    style={{ color: dark ? "white" : "#172554" }}
                  />
                )}
              </span>
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 mt-4 text-sm font-bold text-black dark:text-white"
            >
              Confirm new password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                className="bg-white dark:bg-slate-900 border-black dark:border-white border-2 font-semibold text-lg text-black dark:text-white sm:text-sm rounded-lg focus:ring-primary-600 placeholder-blue-200 dark:placeholder-gray-100 dark:placeholder:opacity-30 focus:border-primary-600 block w-full p-2.5"
                required
              />
              <span
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center leading-5 text-xl cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiFillEye style={{ color: dark ? "white" : "#172554" }} />
                ) : (
                  <AiFillEyeInvisible
                    style={{ color: dark ? "white" : "#172554" }}
                  />
                )}
              </span>
            </div>
          </div>
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              ref={buttonRef}
              className="w-auto mt-2 mb-4 text-white bg-blue-950 hover:bg-blue-900 focus:bg-white dark:focus:bg-slate-900 focus:border-2 focus:border-blue-950 focus:text-blue-950 dark:focus:text-white font-medium rounded-lg text-base px-7 py-2 text-center disabled:hover:cursor-not-allowed dark:focus:border-blue-200"
            >
              Change
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ChangePassword;

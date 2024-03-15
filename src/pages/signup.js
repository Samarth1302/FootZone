import React, { useRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Image from "next/image";

const Signup = ({ dark }) => {
  const [username, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const buttonRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUname(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPass(e.target.value);
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const iconStyle = {
    color: dark ? "white" : "#172554",
  };

  useEffect(() => {
    const { token, email } = router.query;

    if (token && email) {
      const verifyUser = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/verify?token=${token}&email=${email}`,
            {
              method: "POST",
              mode: "cors",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );

          const data = await response.json();

          if (data.token) {
            localStorage.setItem("myUser", JSON.stringify(data.token));
            toast.success("User verification complete");
            setTimeout(() => {
              router.push("/");
            }, 1000);
          } else {
            toast.error(data.error);
          }
        } catch (error) {
          console.error(error);
          toast.error("Verification failed, retry");
        }
      };

      verifyUser();
    }
  }, [router.query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/signup`,
        {
          body: JSON.stringify({ username, email, password }),
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          method: "POST",
        }
      );

      const data = await response.json();
      if (data.message) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPass("");
    }
  };

  return (
    <div className={dark ? "dark" : ""}>
      <Head>
        <title>Signup - FootZone</title>
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
            alt="Login Image"
            className="w-full h-full object-cover"
            width={1920}
            height={500}
            quality={100}
          />
        </div>

        <form
          id="signupForm"
          onSubmit={handleSubmit}
          className="md:w-96 sm:w-72 bg-white dark:bg-black bg-opacity-60 dark:bg-opacity-80 border-2 border-black dark:border-white rounded-lg shadow  space-y-1 p-8 relative z-10"
          method="POST"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              buttonRef.current.focus();
              handleSubmit(e);
            }
          }}
        >
          <h1 className="text-xl text-center  text-black font-semibold  dark:text-white leading-tight tracking-widest text-orange-5 md:text-2xl ">
            Sign Up
          </h1>

          <div>
            <label
              htmlFor="username"
              className="block mt-4 mb-2 text-sm font-bold text-black dark:text-white"
            >
              Username <span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              value={username}
              className="bg-white dark:bg-slate-900 border-black dark:border-white border-2 font-medium text-lg text-black dark:text-white sm:text-sm rounded-lg focus:ring-primary-600 placeholder-blue-200 dark:placeholder-gray-100 dark:placeholder:opacity-30 focus:border-primary-600 block w-full p-2.5 placeholder:text-sm"
              placeholder="user12"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-black mt-4  dark:text-white"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              value={email}
              className="bg-white dark:bg-slate-900 border-black dark:border-white border-2 font-medium text-lg text-black dark:text-white sm:text-sm rounded-lg focus:ring-primary-600 placeholder-blue-200 dark:placeholder-gray-100 dark:placeholder:opacity-30 focus:border-primary-600 block w-full p-2.5 placeholder:text-sm"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 mt-4 text-sm font-bold text-black  dark:text-white"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                className="bg-white dark:bg-slate-900 border-black dark:border-white border-2 font-medium text-lg text-black dark:text-white sm:text-sm rounded-lg focus:ring-primary-600 placeholder-blue-200 dark:placeholder-gray-100 dark:placeholder:opacity-30 focus:border-primary-600 block w-full p-2.5 placeholder:text-sm"
                placeholder="********"
                required
              />
              <span
                onClick={handlePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center leading-5 text-xl cursor-pointer"
              >
                {showPassword ? (
                  <AiFillEye style={iconStyle} />
                ) : (
                  <AiFillEyeInvisible style={iconStyle} />
                )}
              </span>
            </div>
          </div>
          <div className="flex justify-center ">
            <button
              type="submit"
              ref={buttonRef}
              className="w-auto mt-2 mb-4 text-white bg-blue-950  hover:bg-blue-900  focus:bg-white dark:focus:bg-slate-900 focus:border-2 focus:border-blue-950 focus:text-blue-950 dark:focus:text-white font-medium rounded-lg text-base px-7 py-2 text-center disabled:hover:cursor-not-allowed dark:focus:border-blue-200"
            >
              Sign Up
            </button>
          </div>
          <p className="text-center text-base font-semibold dark:font-medium  text-black dark:text-white">
            Already registered?{" "}
            <Link href="/login" legacyBehavior>
              <a className="ml-1 text-blue-950 text-primary-600 hover:underline dark:text-blue-200 underline-offset-4 ">
                Login
              </a>
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Signup;

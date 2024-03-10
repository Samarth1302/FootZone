import React, { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/Tooltip";

const Login = ({ user, dark }) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const buttonRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPass(e.target.value);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/pass/forgot`,
          {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        if (data.success) {
          toast.success(data.message, {
            duration: 4000,
          });
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Fill the email address");
    }
  };
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const iconStyle = {
    color: dark ? "white" : "#172554",
  };

  useEffect(() => {
    if (user.user_id) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/login`,
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const data = await response.json();
        if (data.token) {
          localStorage.setItem("myUser", JSON.stringify(data.token));
          toast.success("Logged in successfully");
          setEmail("");
          setPass("");
          setTimeout(() => {
            router.push("/");
          }, 1000);
        } else {
          toast.error(data.error);
        }
      } catch (error) {
        toast.error(error.message);
        setPass("");
      }
    }
    if (!password) {
      toast.error("Please enter password");
    }
  };

  return (
    <div className={dark ? "dark" : ""}>
      <Head>
        <title>Login - FootZone</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta
          name="keywords"
          content="football soccer stadium players athletes sport"
        />
      </Head>
      <section className="relative min-h-screen bg-white dark:bg-black flex items-center justify-center">
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
          id="loginForm"
          onSubmit={handleSubmit}
          className="md:w-96 sm:w-72 bg-white dark:bg-black bg-opacity-60 dark:bg-opacity-80 border-2 border-black dark:border-white rounded-lg shadow p-8 space-y-2
          relative z-10 "
          method="POST"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              buttonRef.current.focus();
              handleSubmit(e);
            }
          }}
        >
          <h1 className="text-xl text-center font-semibold text-black dark:text-white leading-tight tracking-widest md:text-2xl ">
            Login
          </h1>

          <div>
            <label
              htmlFor="email"
              className="block mt-4 mb-2 text-sm font-bold text-black dark:text-white"
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
              className="block mt-4 mb-2 text-sm font-bold text-black  dark:text-white"
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
                className="bg-white dark:bg-slate-900 border-black dark:border-white border-2 font-medium text-lg text-black dark:text-white sm:text-sm rounded-lg focus:ring-primary-600 placeholder-blue-200 dark:placeholder-gray-100 dark:placeholder:opacity-30 focus:border-primary-600 block w-full p-2.5 "
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
          <div className="flex items-center justify-between">
            {email ? (
              <p
                onClick={handleForgotPassword}
                className="text-sm font-bold text-blue-950 dark:text-blue-200 hover:underline cursor-pointer"
              >
                Forgot password?
              </p>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <p className="text-sm font-bold text-blue-950 dark:text-blue-200 cursor-not-allowed hover:underline underline-offset-4 ">
                      Forgot password?
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>Enter email to click here</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              ref={buttonRef}
              className="w-auto mt-2 mb-4 text-white bg-blue-950  hover:bg-blue-900  focus:bg-white dark:focus:bg-slate-900 focus:border-2 focus:border-blue-950 focus:text-blue-950 dark:focus:text-white font-medium rounded-lg text-base px-7 py-2 text-center disabled:hover:cursor-not-allowed dark:focus:border-blue-200"
            >
              Login
            </button>
          </div>

          <p className=" mt-4 text-center text-base font-semibold dark:font-medium text-black dark:text-white">
            Not registered yet?{" "}
            <Link href="/signup" legacyBehavior>
              <a className=" ml-1 text-blue-950 dark:text-blue-200 underline-offset-4 hover:underline ">
                Sign up
              </a>
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;

import React, { useRef, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Head from "next/head";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
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

  const handleForgotPassword = () => {};
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const iconStyle = {
    color: "#172554",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/login`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("myUser", JSON.stringify(data.token));
        toast.success("Logged in successfully", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEmail("");
        setPass("");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast.error(data.error, {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPass("");
    }
  };

  return (
    <div>
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
      <section className="relative h-screen bg-white flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center z-0">
          <img
            src="/stad.jpg"
            alt="Login Image"
            className="w-full h-full object-cover"
          />
        </div>

        <form
          id="loginForm"
          onSubmit={handleSubmit}
          className="w-96 max-w-lg bg-white bg-opacity-60 border-2 border-black rounded-lg shadow p-8 space-y-6
           relative z-10"
          method="POST"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              buttonRef.current.focus();
              handleSubmit(e);
            }
          }}
        >
          <h1 className="text-xl text-center font-medium text-black leading-tight tracking-tight text-orange-5 md:text-2xl ">
            Login
          </h1>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-black"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              value={email}
              className="bg-white border-black border-2 font-medium text-base text-black sm:text-sm rounded-lg focus:ring-primary-600 placeholder-blue-200 focus:border-primary-600 block w-full p-2.5 "
              placeholder="name@company.com"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-bold text-black "
            >
              Password
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                className="bg-white border-black border-2 font-medium text-base  text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pr-10 p-2.5"
                required=""
              />
              <span
                onClick={handlePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center leading-5 text-xl  cursor-pointer"
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
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={!email}
              className="text-sm font-bold text-blue-950 hover:underline cursor-pointer disabled:hover:cursor-not-allowed"
            >
              Forgot password?
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              ref={buttonRef}
              disabled={!password || !email}
              className="w-auto text-white bg-blue-950 hover:bg-blue-800 font-medium rounded-lg focus:bg-white focus:border-2 focus:border-blue-950 focus:text-blue-950 text-base px-7 py-2 text-center disabled:hover:cursor-not-allowed"
            >
              Login
            </button>
          </div>
          <p className="text-center text-sm font-bold text-black ">
            Don't have an account yet?{" "}
            <Link href="/signup" legacyBehavior>
              <a className="font-bold text-blue-950 hover:underline ">
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

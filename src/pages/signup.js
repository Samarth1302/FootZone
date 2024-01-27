import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Head from "next/head";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/Tooltip";

const Signup = () => {
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
    color: "#172554",
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
            toast.success("User verification complete", {
              position: "top-left",
              autoClose: 1500,
              toastId: "verif",
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              router.push("/");
            }, 1000);
          } else {
            toast.error(data.error, {
              position: "top-left",
              toastId: "erverif",
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
          console.error(error);
          toast.error("Verification failed", {
            position: "top-left",
            autoClose: 1500,
            toastId: "verifail",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
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
        toast.success(data.message, {
          position: "top-left",
          toastId: "signup",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(data.error, {
          position: "top-left",
          autoClose: 1500,
          toastId: "ersignup",
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
        toastId: "er1signup",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setEmail("");
      setUname("");
      setPass("");
    }
  };

  return (
    <div>
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
      <section className="relative h-screen bg-white flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center z-0 opacity-85">
          <img
            src="/stad.jpg"
            alt="Signup Image"
            className="w-full h-full object-cover"
          />
        </div>

        <form
          id="signupForm"
          onSubmit={handleSubmit}
          className="md:w-96 sm:w-72 bg-white bg-opacity-60 border-2 border-black rounded-lg shadow p-8 space-y-1 relative z-10"
          method="POST"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              buttonRef.current.focus();
              handleSubmit(e);
            }
          }}
        >
          <h1 className="text-xl text-center  text-black font-semibold leading-tight tracking-tight text-orange-5 md:text-2xl ">
            Sign Up
          </h1>

          <div>
            <label
              htmlFor="username"
              className="block mt-4 mb-2 text-sm font-bold text-black"
            >
              Username <span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              value={username}
              className="bg-white border-black border-2  font-medium  text-base  text-black sm:text-sm rounded-lg focus:ring-primary-600 placeholder-blue-200 focus:border-primary-600 block w-full p-2.5"
              placeholder="user12"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-black mt-4"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              value={email}
              className="bg-white border-black border-2  font-medium  text-base  text-black sm:text-sm rounded-lg focus:ring-primary-600 placeholder-blue-200 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 mt-4 text-sm font-bold text-black"
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
                className="bg-white border-black border-2  font-medium  text-base  text-black sm:text-sm 
                placeholder-blue-200 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pr-10 p-2.5"
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <button
                    type="submit"
                    ref={buttonRef}
                    disabled={!username || !password || !email}
                    className="w-auto mt-5 mb-4 text-white bg-blue-950 hover:bg-blue-900 font-medium rounded-lg focus:bg-white focus:border-2 focus:border-blue-950 focus:text-blue-950 text-base px-7 py-2 text-center disabled:hover:cursor-not-allowed"
                  >
                    Sign Up
                  </button>
                </TooltipTrigger>
                <TooltipContent>Enter all the required fields</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-center text-base font-bold text-black">
            Already registered?{" "}
            <Link href="/login" legacyBehavior>
              <a className=" text-blue-950 text-primary-600 hover:underline underline-offset-4 ">
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

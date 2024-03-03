import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import DOMPurify from "dompurify";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Confirm from "@/components/Confirm";
import RouteLoader from "@/components/Loader";
import "@/styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inria_Sans } from "next/font/google";
import BotpressChatWidget from "@/components/Bot.js";

const font = Inria_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState({});
  const [key, setKey] = useState();
  const [dark, setDark] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const router = useRouter();
  const currentPath = router.asPath;

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("myUser"));
    if (token) {
      try {
        const decodedToken = jwt.verify(
          token,
          process.env.NEXT_PUBLIC_JWT_SECRET
        );
        const sanitizedUser = {
          user_id: DOMPurify.sanitize(decodedToken.user_id),
          username: DOMPurify.sanitize(decodedToken.username),
        };
        setUser(sanitizedUser);
      } catch (error) {
        console.error("Error verifying token:", error.message);
        localStorage.removeItem("myUser");
      }
    }
    setKey(Math.random());
  }, [router.query]);

  const confirmLogout = () => {
    localStorage.removeItem("myUser");
    setUser({});
    setKey(Math.random());
    router.push("/");
    setShowLogoutConfirmation(false);
    toast.success("User logged out.", {
      position: "top-left",
      autoClose: 1500,
      toastId: "logout",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: dark ? "dark" : "light",
    });
  };
  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };
  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const getDarkModePreference = () => {
      setDark(
        window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    };
    getDarkModePreference();
  }, []);

  return (
    <>
      <main className={font.className}>
        <RouteLoader dark={dark} />
        <ToastContainer
          position="top-left"
          limit={1}
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={dark ? "dark" : "light"}
        />

        {key && (
          <Navbar
            user={user}
            key={key}
            logout={handleLogout}
            dark={dark}
            setDark={setDark}
            currentPath={currentPath}
          />
        )}
        {!isMobile && <BotpressChatWidget />}
        <Component user={user} dark={dark} {...pageProps} />

        <Footer dark={dark} />
        {showLogoutConfirmation && (
          <Confirm
            message="Are you sure you want to logout?"
            onConfirm={confirmLogout}
            onCancel={cancelLogout}
            dark={dark}
          />
        )}
      </main>
    </>
  );
}

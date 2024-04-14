import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import DOMPurify from "dompurify";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Confirm from "@/components/Confirm";
import Comment from "@/components/Comment";
import RouteLoader from "@/components/Loader";
import "@/styles/globals.css";
import toast, { Toaster } from "react-hot-toast";
import { Inria_Sans } from "next/font/google";
import BotpressChatWidget from "@/components/Bot.js";
import { GoogleAnalytics } from "@next/third-parties/google";

const font = Inria_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState({});
  const [sidebar, setSidebar] = useState(false);
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
    toast.success("User logged out", { id: "logout" });
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
    const handleRouterChange = () => {
      if (isMobile) {
        setSidebar(false);
      }
    };

    router.events.on("routeChangeComplete", handleRouterChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouterChange);
    };
  }, [isMobile, router.events]);

  useEffect(() => {
    const getDarkModePreference = () => {
      setDark(
        window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    };
    getDarkModePreference();
  }, []);

  useEffect(() => {
    const scrollbarTrackBackground = dark ? "#000000" : "#bfdbfe";
    document.documentElement.style.setProperty(
      "--scrollbar-track-background",
      scrollbarTrackBackground
    );
  }, [dark]);

  return (
    <>
      <main className={font.className}>
        <RouteLoader dark={dark} />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: dark ? "#333" : "#fff",
              color: dark ? "#fff" : "#333",
            },
            success: {
              duration: 4000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
            error: {
              duration: 4000,
              theme: {
                primary: "red",
                secondary: "black",
              },
            },
          }}
        />
        {key && (
          <Navbar
            user={user}
            key={key}
            logout={handleLogout}
            dark={dark}
            setDark={setDark}
            currentPath={currentPath}
            sidebar={sidebar}
            setSidebar={setSidebar}
            isMobile={isMobile}
          />
        )}
        {!isMobile && <BotpressChatWidget />}
        <div className={`content ${sidebar ? "sidebar-open" : ""}`}>
          <Component
            user={user}
            dark={dark}
            sidebar={sidebar}
            setSidebar={setSidebar}
            {...pageProps}
          />
          <GoogleAnalytics gaId="G-FSE2NJNNW3" />
          <Comment dark={dark} user={user} />
          <Footer dark={dark} />
        </div>

        {showLogoutConfirmation && (
          <Confirm
            message="Are you sure you want to logout?"
            onConfirm={confirmLogout}
            onCancel={cancelLogout}
            dark={dark}
          />
        )}
      </main>
      <style jsx>{`
        @media (min-width: 768px) {
          .sidebar-open {
            margin-left: 160px;
          }
        }
      `}</style>
    </>
  );
}

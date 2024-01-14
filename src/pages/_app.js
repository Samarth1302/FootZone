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
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState({});
  const [key, setKey] = useState();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("myUser"));
    if (token) {
      try {
        const decodedToken = jwt.verify(
          token,
          process.env.NEXT_PUBLIC_JWT_SECRET
        );
        const sanitizedUser = {
          email: DOMPurify.sanitize(decodedToken.email),
          username: DOMPurify.sanitize(decodedToken.username),
          user_id: DOMPurify.sanitize(decodedToken.user_id),
        };
        setUser(sanitizedUser);
      } catch (error) {
        localStorage.removeItem("myUser");
      }
    }
    setKey(Math.random());
  }, [router.query]);

  return (
    <>
      <RouteLoader />
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
        theme="light"
      />

      {key && (
        <Navbar
          user={user}
          key={key}
          logout={() => setShowLogoutConfirmation(true)}
        />
      )}

      <Component user={user} {...pageProps} />
      <Footer />
      {showLogoutConfirmation && (
        <Confirm
          message="Are you sure you want to logout?"
          onConfirm={() => {
            localStorage.removeItem("myUser");
            setUser({});
            setKey(Math.random());
            router.push("/");
            setShowLogoutConfirmation(false);
          }}
          onCancel={() => setShowLogoutConfirmation(false)}
        />
      )}
    </>
  );
}

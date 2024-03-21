import Link from "next/link";
import { useRouter } from "next/router";
import { BsCart2 } from "react-icons/bs";
import Head from "next/head";
import { useEffect, useState,useRef } from "react";
import React from 'react'
import toast from "react-hot-toast";
import Image from "next/image";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

const Shop = ({user,dark}) => {
    const [cart, setCart] = useState({});
    const [total, setTotal] = useState(0);
    const [showCart, setShowCart] = useState(false);
    const router = useRouter();
    const ref = useRef();
    const [cartCount, setCartCount] = useState(Object.keys(cart).length);
    const [products, setProducts] = useState([]);
    
  const toggleCart = () => {
    setShowCart(!showCart);
  };
  useEffect(() => {
    setCartCount(Object.keys(cart).length);
  }, [cart]);

    useEffect(() => {
        try {
          if (localStorage.getItem("cart")) {
            setCart(JSON.parse(localStorage.getItem("cart")));
            saveCart(JSON.parse(localStorage.getItem("cart")));
          }
        } catch (error) {
          console.error(error);
          localStorage.clear();
        }

        const handleStorageChange = (event) => {
          if (event.key === "myCart") {
            try {
              const storedCart = JSON.parse(event.newValue);
              const sanitizedCart = DOMPurify.sanitize(storedCart);
              setCart(sanitizedCart);
              computeTotal(sanitizedCart);
            } catch (error) {
              localStorage.removeItem("myCart");
            }
          }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
          window.removeEventListener("storage", handleStorageChange);
        };
      }, [router.query]);

    //   const logout = () => {
    //     localStorage.removeItem("myUser");
    //     setUser({ value: null });
    //     router.push("/");
    //   };

      const saveCart = (myCart) => {
        localStorage.setItem("cart", JSON.stringify(myCart));
        computeTotal(subt);
      };
    
      const computeTotal = (cart) => {
        let subt = 0;
        if (!cart) return subt;
        let keys = Object.keys(cart);
        for (let i = 0; i < keys.length; i++) {
          subt += cart[keys[i]].price * cart[keys[i]].qty;
        }
        setTotal(subt);
      };

      const addtoCart = (itemId, qty, price, iName, size, type) => {
        if (Object.keys(cart).length == 0) {
        }
        const newCart = { ...cart };
        if (itemId in cart) {
          if (newCart[itemId].qty + qty <= 10) {
            newCart[itemId].qty += qty;
          }
        } else {
            newCart[itemId] = { qty: 1, price, iName, size, type };
        }
        setCart(newCart);
        saveCart(newCart);
      };
    
      const removefromCart = (itemId, qty, price, iName, size, type) => {
        if (!cart) return;
        const newCart = { ...cart };
        if (itemId in cart) {
          newCart[itemId].qty -= qty;
        }
        if (newCart[itemId].qty <= 0) {
          delete newCart[itemId];
        }
        setCart(newCart);
        saveCart(newCart);
      };
    
      const clearCart = () => {
        setCart({});
        saveCart({});
      };
    
      const buyNow = (itemId, qty, price, iName, size, type) => {
        let newCart = {};
        newCart[itemId] = { qty: 1, price, iName, size, type };
        setCart(newCart);
        saveCart(newCart);
        if (user.value) {
          router.push("/checkout");
        } else {
          toast.error("Please login to buy a product", {
            id: "notloggedin"
          });
        }
      };

  return (
    <div className={`min-h-screen ${dark?"dark":""} `}>
      <Head>
        <title>FootZone Shop</title>
        <meta name="description" content="" />
        <meta name="keywords" content="shop e-commerce products buy cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    {!showCart &&
        <div className="fixed inset-y-0 right-0 flex items-center justify-end">
          <button
            onClick={toggleCart}
            className="flex bg-blue-100 hover:py-6 hover:pl-4 hover:pr-4 dark:bg-slate-700 rounded-l-3xl py-5 pl-3 pr-3"
          >
            <BsCart2
              className="flex text-xl md:text-2xl"
              style={{ color: dark ? "white" : "black" }}
            />
            <p className="flex ml-2 text-black dark:text-white text-sm md:text-base">
              {cartCount}
            </p>
          </button>
      </div>}
      {showCart && (<div
        ref={ref}
        className={`w-60 h-full overflow-y-scroll absolute bg-blue-100 dark:bg-slate-800 px-8 py-10 text-base transition-all text-slate-300 ${
          showCart ? "right-0" : "-right-96"
        } `}
      >
        <h2 className="font-bold text-xl text-center text-black dark:text-slate-50">
          Fut Cart
        </h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl"
        >
          <IoMdCloseCircle className="dark:text-white text-black hover:text-red-500 dark:hover:text-red-600" />
        </span>
        <ol className="list-decimal font-semibold ">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 text-black dark:text-slate-50 font-semibold">Your cart is empty</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="product flex my-5 text-base">
                  <div className="w-2/3 font-semibold mx-4">
                    {cart[k].name}
                  </div>
                  <div className="flex items-center text-lg font-bold justify-center ">
                    <FaMinusCircle
                      onClick={() => {
                        removefromCart(k, 1, cart[k].price);
                      }}
                      className="cursor-pointer"
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                    <FaPlusCircle
                      onClick={() => {
                        addtoCart(k, cart[k].name, 1, cart[k].price);
                      }}
                      className="cursor-pointer disabled:cursor-not-allowed"
                      aria-disabled={cart[k] && cart[k].qty === 10}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="text-black dark:text-slate-50 font-bold">SubTotal: ₹ {total}</span>
        <div className="flex my-4">
          <Link href={"/order"} legacyBehavior>
            <button
              disabled={Object.keys(cart).length === 0 || !user.email}
              className=" dark:bg-slate-700 dark:text-white flex mr-2 disabled:hover:cursor-not-allowed bg-blue-200 border-0 py-2 px-1 
            text-black focus:outline-none rounded text-sm"
            >
              Order
            </button>
          </Link>
          <button
            disabled={Object.keys(cart).length === 0}
            onClick={clearCart}
            className="  dark:bg-slate-700 dark:text-white flex disabled:hover:cursor-not-allowed bg-blue-200 border-0 py-2 px-1 
            text-black focus:outline-none rounded text-sm"
          >
            Clear Cart
          </button>
          </div>
    </div>)}
    <div className="min-h-screen bg-white dark:bg-slate-900"><div className="flex justify-center flex-wrap">
            {products.map((product) => (
              <div
                key={product.id}
                className="lg:w-1/5 md:w-1/3 p-4 w-full sm:w-1/2 h-48 cursor-pointer shadow-lg shadow-slate-800 m-5 rounded-lg border-slate-800 border-r-2"
              >
                <div className="flex mt-4 text-center">
                  <div className="mr-4">
                    <Image
                      className="m-auto block"
                      src={product.img}
                      alt={product.name}
                      width={140}
                      height={100}
                    ></Image>
                  </div>
                  <div className="text-left">
                    <h3 className="text-white text-lg">{product.name}</h3>
                    <p className="mt-1 text-base">₹ {product.price}</p>
                    <p className="text-base">
                      In cart: {cart[product.id] ? cart[product.id].qty : 0}
                    </p>
                    <button
                      disabled={cart[product.id] && cart[product.id].qty > 9}
                      onClick={() => handleButton(product)}
                      className="flex m-2 text-sm text-white bg-slate-700 
                  border-white border-2 py-1  px-2 focus:outline-none hover:bg-slate-600 rounded disabled:hover:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Shop;
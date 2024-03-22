import Link from "next/link";
import { useRouter } from "next/router";
import { BsCart2 } from "react-icons/bs";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import React from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

const Shop = ({ user, dark }) => {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const router = useRouter();
  const ref = useRef();
  const [cartCount, setCartCount] = useState(Object.keys(cart).length);
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});

  const toggleCart = () => {
    setShowCart(!showCart);
  };
  useEffect(() => {
    setCartCount(Object.keys(cart).length);
  }, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/shop/products`
        );
        const products = await response.json();
        setProducts(products);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchProducts();
  }, []);

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

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    computeTotal(cart);
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes({ ...selectedSizes, [productId]: size });
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

  const addtoCart = (itemId, iName, price, size) => {
    const cartItemId = size ? `${itemId}-${size}` : itemId;
    const newCart = { ...cart };

    if (cartItemId in cart) {
      if (newCart[cartItemId].qty + 1 <= 10) {
        newCart[cartItemId].qty += 1;
      }
    } else {
      newCart[cartItemId] = { qty: 1, price, iName, size };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const removefromCart = (cartItemId) => {
    if (!cart) return;
    const newCart = { ...cart };
    if (cartItemId in cart) {
      if (newCart[cartItemId].qty == 1) {
        delete newCart[cartItemId];
      } else newCart[cartItemId].qty -= 1;

      setCart(newCart);
      saveCart(newCart);
    }
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
    setTotal(0);
  };

  return (
    <div className={`min-h-screen ${dark ? "dark" : ""} `}>
      <Head>
        <title>FootZone Shop</title>
        <meta name="description" content="" />
        <meta name="keywords" content="shop e-commerce products buy cart" />
      </Head>
      {!showCart && (
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
        </div>
      )}
      {showCart && (
        <div
          ref={ref}
          className={`w-60 h-full items-center justify-end overflow-y-scroll fixed bg-blue-100 dark:bg-slate-950 px-8 py-10 text-base transition-all text-slate-300 z-20 ${
            showCart ? "right-0" : "-right-60"
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
              <div className="my-4 text-black dark:text-slate-50 font-semibold">
                Your cart is empty
              </div>
            )}
            {Object.keys(cart).map((cartItemId) => {
              const { iName, size, qty, price } = cart[cartItemId];
              return (
                <li key={cartItemId}>
                  <div className="product flex my-5 text-base">
                    <div className="w-2/3 font-semibold mx-4">
                      {iName} {size && `(${size})`}
                    </div>
                    <div className="flex items-center text-lg font-bold justify-center ">
                      <FaMinusCircle
                        onClick={() => {
                          removefromCart(cartItemId);
                        }}
                        className="cursor-pointer"
                      />
                      <span className="mx-2 text-sm">{qty}</span>
                      <FaPlusCircle
                        onClick={() => {
                          addtoCart(cartItemId, iName, price);
                        }}
                        className="cursor-pointer disabled:cursor-not-allowed"
                        aria-disabled={qty === 10}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <span className="text-black dark:text-slate-50 font-bold">
            SubTotal: ₹ {total}
          </span>
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
        </div>
      )}
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <div className="flex justify-center flex-wrap p-16">
          {products.map((product) => (
            <div
              key={product._id}
              className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                className="h-48 w-full object-cover object-center"
                src={product.img}
                alt={product.name}
              />
              <div className="p-4">
                <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
                  {product.iName}
                </h2>
                <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
                  {product.description}
                </p>
                <div className="flex items-center">
                  <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                    ₹ {product.price}
                  </p>
                  <p className="text-base font-medium text-gray-500 line-through dark:text-gray-300">
                    ₹ {product.price * 1.2}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    20% off
                  </p>
                </div>
                {product.size && product.size.length > 0 && (
                  <div className="mt-4">
                    <div className="mt-1 relative">
                      <select
                        id={`size-${product._id}`}
                        onChange={(e) =>
                          handleSizeSelect(product._id, e.target.value)
                        }
                        className="block w-full pl-3 pr-10 py-2 text-base border-black border-2 dark:text-white dark:bg-slate-800 dark:border-white rounded-md "
                      >
                        <option className="dark:text-white">Select size</option>
                        {product.size.map((sz) => (
                          <option
                            key={sz}
                            value={sz}
                            className="dark:text-white"
                          >
                            {sz}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                <button
                  disabled={
                    !selectedSizes[product._id] &&
                    product.size &&
                    product.size.length > 0
                  }
                  onClick={() =>
                    addtoCart(
                      product._id,
                      product.iName,
                      product.price,
                      selectedSizes[product._id]
                    )
                  }
                  className="mt-4 text-sm text-white bg-blue-500 dark:bg-slate-700 border-white border-2 py-1 px-2 focus:outline-none hover:bg-blue-700 dark:hover:bg-slate-600 rounded-md disabled:hover:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;

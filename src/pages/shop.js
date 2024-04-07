import Link from "next/link";
import { useRouter } from "next/router";
import { BsCart2 } from "react-icons/bs";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import React from "react";
import toast from "react-hot-toast";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import useCart from "@/lib/useCart";

const Shop = ({ user, dark, sidebar, setSidebar }) => {
  const { cart, total, addtoCart, removefromCart, clearCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const router = useRouter();
  const ref = useRef();
  const [cartCount, setCartCount] = useState(Object.keys(cart).length);
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});

  const toggleCart = () => {
    setShowCart((prevShowCart) => !prevShowCart);
    if (sidebar) {
      setSidebar(false);
    }
  };

  useEffect(() => {
    if (sidebar && showCart) {
      setShowCart(false);
    }
  }, [sidebar, showCart]);

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

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes({ ...selectedSizes, [productId]: size });
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
            className="flex bg-blue-100 dark:hover:bg-slate-600 dark:bg-slate-700 rounded-l-2xl py-4 pl-2 pr-3"
          >
            <BsCart2
              className="flex text-xl md:text-2xl"
              style={{ color: dark ? "white" : "black" }}
            />
            <p className="flex ml-1 text-black dark:text-white text-sm md:text-base">
              {cartCount}
            </p>
          </button>
        </div>
      )}
      {showCart && (
        <div
          ref={ref}
          className={`w-52 md:w-60 h-full items-center justify-end overflow-y-scroll fixed sidemenu bg-blue-100 dark:bg-slate-950 px-8 py-10 text-base transition-all text-slate-300 z-20 ${
            showCart ? "right-0" : "-right-52 md:-right-60"
          } `}
        >
          <h2 className="font-bold text-xl text-center text-black dark:text-slate-50">
            Cart
          </h2>
          <span
            onClick={toggleCart}
            className="absolute top-5 right-2 cursor-pointer text-xl"
          >
            <IoMdCloseCircle className="dark:text-white text-black hover:text-red-500 dark:hover:text-red-600" />
          </span>
          <ol className="list-decimal font-semibold ">
            {Object.keys(cart).length == 0 && (
              <div className="my-4 text-red-500 font-semibold">
                Your cart is empty
              </div>
            )}
            {Object.keys(cart).map((cartItemId) => {
              const { iName, size, qty, price } = cart[cartItemId];
              return (
                <li
                  className="text-black dark:text-white md:font-semibold font-medium"
                  key={cartItemId}
                >
                  <div className=" flex my-5 text-base">
                    <div className="w-2/3 font-medium md:font-semibold mx-4 text-black dark:text-white">
                      {iName} {size && `(${size})`}
                    </div>
                    <div className="flex items-center text-base lg:text-lg font-normal md:font-bold justify-center">
                      <FaMinusCircle
                        onClick={() => {
                          removefromCart(cartItemId);
                        }}
                        className="dark:text-white text-black hover:text-yellow-500 dark:hover:text-yellow-600 cursor-pointer"
                      />
                      <span className="mx-2 text-sm">{qty}</span>
                      <FaPlusCircle
                        onClick={() => {
                          addtoCart(cartItemId, iName, price);
                        }}
                        className="dark:text-white text-black hover:text-green-500 dark:hover:text-green-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <span className="text-black dark:text-slate-50 font-medium md:font-bold">
            SubTotal: ₹ {total}
          </span>
          <div className="flex my-4">
            <button
              onClick={() => {
                router.push("/order");
              }}
              disabled={Object.keys(cart).length === 0 || !user.user_id}
              className="dark:bg-slate-700 dark:hover:bg-slate-800 hover:bg-blue-300 dark:text-white flex mx-4 disabled:hover:cursor-not-allowed bg-blue-200 border-0 py-2 px-2 font-semibold
            text-black focus:outline-none rounded text-sm"
            >
              Order
            </button>
            <button
              disabled={Object.keys(cart).length === 0}
              onClick={clearCart}
              className="dark:bg-slate-700 dark:text-white flex dark:hover:bg-slate-800 hover:bg-blue-300 font-semibold disabled:hover:cursor-not-allowed bg-blue-200 border-0 py-2 px-2 
            text-black focus:outline-none rounded text-sm"
            >
              Clear
            </button>
          </div>
        </div>
      )}
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <h1 className="text-xl md:text-3xl font-bold  text-blue-900 dark:text-blue-200 px-5 pt-4 text-center">
          FootZone Products
        </h1>
        <div className="flex justify-center flex-wrap px-16 pb-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="mx-auto lg:mx-4 mt-8 w-60 lg:w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
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
                    ₹ {product.price * (1 - product.offer / 100)}
                  </p>
                  <p className="text-base font-medium text-gray-500 line-through dark:text-gray-300">
                    ₹ {product.price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {product.offer}% off
                  </p>
                </div>
                <div className="flex flex-row justify-between">
                  {product.size && product.size.length > 0 && (
                    <div className="mt-4">
                      <div className="relative">
                        <select
                          id={`size-${product._id}`}
                          defaultValue={product.size[0]}
                          onChange={(e) =>
                            handleSizeSelect(product._id, e.target.value)
                          }
                          className="w-auto px-2 py-1 text-base border-black border-2 dark:text-white dark:bg-slate-800 dark:border-white rounded-md "
                        >
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
                    onClick={() =>
                      addtoCart(
                        product._id,
                        product.iName,
                        product.price * (1 - product.offer / 100),
                        selectedSizes[product._id] || product.size[0]
                      )
                    }
                    className="mt-4 text-sm text-white bg-blue-500 dark:bg-slate-700 border-white border-2 py-1 px-2 focus:outline-none hover:bg-blue-700 dark:hover:bg-slate-600 rounded-md"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto text-center  pb-8">
          <button
            disabled={Object.keys(cart).length === 0}
            onClick={() => {
              router.push("/order");
            }}
            className="dark:bg-slate-700 dark:hover:bg-slate-800 hover:bg-blue-300 dark:text-white mr-4 disabled:hover:cursor-not-allowed bg-blue-200 py-3 border-0 px-5 font-semibold
            text-black focus:outline-none rounded text-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;

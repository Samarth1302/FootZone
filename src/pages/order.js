import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import useCart from "@/lib/useCart";
import RouteLoader from "@/components/Loader";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Order = ({ dark, user }) => {
  const router = useRouter();
  const {
    cart,
    total,
    addtoCart,
    removefromCart,
    setCart,
    saveCart,
    clearCart,
  } = useCart();
  const [cartLoaded, setCartLoaded] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      setCartLoaded(true);
    }
  }, [cart]);

  const handleAdClick = () => {
    router.push("/shop");
  };
  const handleSubmit = async (e) => {
    setOrderedItems(Object.values(cart));
    setOrderTotal(total);
    setOrderDone(true);
    toast.success("Order placed successfully");
    clearCart();
  };

  const handleQuantityChange = (cartItemId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      const newCart = { ...cart };
      newCart[cartItemId].qty = newQuantity;
      setCart(newCart);
      saveCart(newCart);
    } else {
      toast.error("Quantity not permissible", {
        id: "invalidqty",
      });
    }
  };

  return (
    <div className={`min-h-screen ${dark ? "dark" : ""} `}>
      <Head>
        <title>Your Order</title>
        <meta name="description" content="Your order details." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RouteLoader dark={dark} />
      {!cartLoaded && Object.keys(cart).length === 0 && !orderDone && (
        <div className="min-h-screen flex justify-center items-center dark:bg-gray-900 dark:text-white bg-white text-black">
          <div className="text-center justify-center flex flex-col h-screen">
            <MdOutlineRemoveShoppingCart className="text-9xl dark:text-white text-black mb-10 mx-auto" />
            <button
              onClick={handleAdClick}
              className="bg-blue-300 text-gray-900 px-6 py-3 rounded hover:bg-blue-200 dark:hover:bg-gray-800 focus:outline-none dark:bg-gray-700 dark:text-white"
            >
              Go to Shop page
            </button>
          </div>
        </div>
      )}
      {cartLoaded ? (
        Object.keys(cart).length === 0 && !orderDone ? (
          <div
            className="min-h-screen flex justify-center items-center
          dark:bg-gray-900 dark:text-white bg-white text-black"
          >
            <div className="text-center justify-center flex flex-col h-screen">
              <MdOutlineRemoveShoppingCart className="text-9xl dark:text-white text-black mb-10 mx-auto" />

              <button
                onClick={handleAdClick}
                className="bg-blue-300 text-gray-900 px-6 py-3 rounded hover:bg-blue-200 dark:hover:bg-gray-800 focus:outline-none dark:bg-gray-700 dark:text-white"
              >
                Go to Shop page
              </button>
            </div>
          </div>
        ) : (
          <div
            className="min-h-screen dark:bg-gray-900 dark:text-white bg-white text-black
          flex flex-col items-center justify-center px-4 py-8"
          >
            <h1 className="mb-10 text-center text-xl font-bold md:text-2xl lg:text-3xl">
              Your Order
            </h1>
            <div className="w-full max-w-md">
              <div className="space-y-4">
                {orderDone
                  ? orderedItems.map((item, index) => (
                      <div
                        key={index}
                        className="bg-blue-100 dark:bg-gray-800 rounded-lg p-4 flex relative items-center justify-between"
                      >
                        <div className="mr-4 rounded-md overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.iName}
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="flex-1 pr-4">
                          <h3 className="text-lg font-semibold">
                            {item.iName} {item.size && `(${item.size})`}
                          </h3>
                          <p className="dark:text-gray-300 mt-1">
                            (Item Price: ₹ {item.price} )
                          </p>
                        </div>
                        <div className="flex items-center flex-col">
                          <span className="text-base dark:text-white px-2">
                            {item.qty}
                          </span>
                          <p className="text-center">
                            Price: ₹ {item.qty * item.price}
                          </p>
                        </div>
                      </div>
                    ))
                  : Object.keys(cart).map((cartItemId) => {
                      const item = cart[cartItemId];
                      return (
                        <div
                          key={cartItemId}
                          className="bg-blue-100 dark:bg-gray-800 rounded-lg p-4 flex relative items-center justify-between"
                        >
                          <div className="mr-4 rounded-md overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.iName}
                              width={90}
                              height={90}
                            />
                          </div>
                          <div className="flex-1 pr-4">
                            <h3 className="text-lg font-semibold">
                              {item.iName} {item.size && `(${item.size})`}
                            </h3>
                            <p className="dark:text-gray-300 mt-1">
                              (Item Price: ₹ {item.price} )
                            </p>
                          </div>
                          <div className="flex items-center flex-col">
                            <div className="flex items-center mb-2">
                              <button
                                className="dark:text-gray-400 hover:text-blue-500 dark:hover:text-white"
                                onClick={() => removefromCart(cartItemId)}
                              >
                                <FaMinusCircle />
                              </button>
                              <input
                                type="text"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                min="1"
                                max="10"
                                value={cart[cartItemId].qty || item.qty}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    cartItemId,
                                    parseInt(e.target.value) || 1
                                  )
                                }
                                className="dark:bg-slate-900 text-base dark:text-white border-white border-2 w-10 mx-2 px-2 rounded text-center"
                              />
                              <button
                                className="dark:text-gray-400 hover:text-blue-500 dark:hover:text-white"
                                onClick={() =>
                                  addtoCart(cartItemId, item.iName, item.price)
                                }
                              >
                                <FaPlusCircle />
                              </button>
                            </div>
                            <p className="text-center">
                              Price: ₹ {item.qty * item.price}
                            </p>
                          </div>
                        </div>
                      );
                    })}
              </div>

              {!orderDone && (
                <div className="flex flex-row items-center mt-4">
                  <button
                    className="dark:bg-slate-700 dark:hover:bg-slate-800 hover:bg-blue-300 dark:text-white mx-4 disabled:hover:cursor-not-allowed bg-blue-200 border-0 py-2 px-2
                text-black focus:outline-none rounded text-sm"
                    onClick={handleAdClick}
                  >
                    Add More
                  </button>
                  <button
                    disabled={Object.keys(cart).length === 0}
                    className="dark:bg-slate-700 dark:hover:bg-slate-800 hover:bg-blue-300 dark:text-white mr-4 disabled:hover:cursor-not-allowed bg-blue-200 border-0 py-2 px-2
                text-black focus:outline-none rounded text-sm"
                    onClick={handleSubmit}
                  >
                    Place Order
                  </button>
                  <div className="text-xl ml-auto font-semibold">
                    Total: ₹ {total}
                  </div>
                </div>
              )}
              {orderDone && (
                <div className="mt-4 text-center">
                  <div className="text-xl ml-auto font-semibold">
                    Total: ₹ {orderTotal}
                  </div>
                  <div className="text-green-600 text-xl mt-4">
                    Order Placed on {new Date().toLocaleDateString()}
                  </div>
                  <div className="flex mt-4 justify-center">
                    <p className="text-sm">User ID: {user.user_id}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="text-red-500 mt-10 animate-pulse text-center">
              <p className="text-sm">
                This is a mock order, no real items will be delivered to you.
                <br />
                Once you exit this page your order will be deleted.
              </p>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default Order;

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const useCart = () => {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
    }

    const handleStorageChange = (event) => {
      if (event.key === "cart") {
        try {
          const storedCart = JSON.parse(event.newValue);
          const sanitizedCart = DOMPurify.sanitize(storedCart);
          setCart(sanitizedCart);
          computeTotal(sanitizedCart);
        } catch (error) {
          localStorage.removeItem("cart");
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router.query]);

  const saveCart = (myCart) => {
    computeTotal(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };
  const computeTotal = (cart) => {
    let subTotal = 0;
    if (!cart) return subTotal;
    Object.values(cart).forEach((item) => {
      subTotal += item.price * item.qty;
    });
    setTotal(subTotal);
  };

  const addtoCart = (itemId, iName, price, size, quantity = 1) => {
    const cartItemId = size ? `${itemId}-${size}` : itemId;
    const newCart = { ...cart };

    if (cartItemId in cart) {
      if (newCart[cartItemId].qty + quantity <= 10) {
        newCart[cartItemId].qty += quantity;
      }
    } else {
      newCart[cartItemId] = { qty: quantity, price, iName, size };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const removefromCart = (cartItemId, quantity = 1) => {
    if (!cart) return;
    const newCart = { ...cart };
    if (cartItemId in cart) {
      if (newCart[cartItemId].qty <= quantity) {
        delete newCart[cartItemId];
      } else newCart[cartItemId].qty -= quantity;

      setCart(newCart);
      saveCart(newCart);
    }
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
    setTotal(0);
  };

  return {
    cart,
    total,
    addtoCart,
    removefromCart,
    clearCart,
    setCart,
  };
};
export default useCart;

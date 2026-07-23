"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { store, RootState } from "./store";
import { setCart } from "./features/cartSlice";
import { setWishlist } from "./features/wishlistSlice";
import { setAuth } from "./features/authSlice";
import { setTheme } from "./features/themeSlice";

function ThemeWatcher({ children }: { children: React.ReactNode }) {
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("trendshop-theme", themeMode);
  }, [themeMode]);

  return <>{children}</>;
}

function ReduxInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Load Cart
    const savedCart = localStorage.getItem("trendshop-cart");
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch(setCart(cartItems));
      } catch (error) {
        console.error("Failed to load cart:", error);
        localStorage.removeItem("trendshop-cart");
      }
    }

    // Load Wishlist
    const savedWishlist = localStorage.getItem("trendshop-wishlist");
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist);
        dispatch(setWishlist(wishlistItems));
      } catch (error) {
        console.error("Failed to load wishlist:", error);
        localStorage.removeItem("trendshop-wishlist");
      }
    }

    // Load Auth
    const savedAuth = localStorage.getItem("trendshop-auth");
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        dispatch(setAuth(authData));
      } catch (error) {
        console.error("Failed to load auth:", error);
        localStorage.removeItem("trendshop-auth");
      }
    }

    // Load Theme
    const savedTheme = localStorage.getItem("trendshop-theme");
    const initialTheme = savedTheme === "dark" ? "dark" : "light";
    dispatch(setTheme(initialTheme));
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dispatch]);

  // Subscribe to persist cart, wishlist, and auth state changes
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem("trendshop-cart", JSON.stringify(state.cart.items));
      localStorage.setItem("trendshop-wishlist", JSON.stringify(state.wishlist.items));
      localStorage.setItem("trendshop-auth", JSON.stringify(state.auth));
    });
    return unsubscribe;
  }, []);

  return <ThemeWatcher>{children}</ThemeWatcher>;
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ReduxInitializer>{children}</ReduxInitializer>
    </Provider>
  );
}

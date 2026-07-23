"use client";

import Link from "next/link";
import { Menu, X, Heart, ShoppingBasket, User, Sun, Moon } from "lucide-react";
import NavLinks from "./Navlinks";
import SearchBar from "./SearchBar";
import Mobilemenu from "./Mobilemenu";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { toggleTheme, setTheme } from "../../store/features/themeSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.items.length
  );

  const themeMode = useSelector(
    (state: RootState) => state.theme.mode
  );

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    setMounted(true);
    try {
      const savedTheme = localStorage.getItem("themeMode");
      if (savedTheme === "dark" || savedTheme === "light") {
        dispatch(setTheme(savedTheme));
      }
    } catch (e) {}
  }, [dispatch]);

  useEffect(() => {
    if (!mounted) return;
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("themeMode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("themeMode", "light");
    }
  }, [themeMode, mounted]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };


  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white shadow-xs transition-colors">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Trend<span className="text-black dark:text-white">Shop</span>
        </Link>

        <NavLinks />

        <SearchBar />

        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={handleToggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
              title={themeMode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {themeMode === "dark" ? (
                <Sun size={22} className="text-amber-400 hover:rotate-45 transition" />
              ) : (
                <Moon size={22} className="text-slate-700 hover:-rotate-12 transition" />
              )}
            </button>
          )}

          <Link href="/wishlist" className="relative p-1 hover:text-blue-600 dark:hover:text-blue-400 transition">
            <Heart size={22} />
            {mounted && wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-xs">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative p-1 hover:text-blue-600 dark:hover:text-blue-400 transition">
            <ShoppingBasket size={22} />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-xs">
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/profile" className="relative flex items-center gap-1.5 p-1 hover:text-blue-600 dark:hover:text-blue-400 transition">
            <User size={22} />
            {mounted && isAuthenticated && user && (
              <span className="hidden sm:inline-block text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                {user.name.split(" ")[0]}
              </span>
            )}
          </Link>

          <button className="lg:hidden p-1" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && <Mobilemenu />}
    </header>
  );
}
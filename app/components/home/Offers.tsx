"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "../../store/store";

export default function Offers() {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleExploreDeals = () => {
    if (!isAuthenticated) {
      router.push("/signup");
    } else {
      router.push("/products");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-950 dark:to-slate-900 border border-transparent dark:border-gray-800 text-white rounded-3xl p-10 md:p-16 text-center shadow-xl">
        <p className="font-semibold mb-3 tracking-wide text-blue-200 uppercase text-sm">
          Limited Time Offer
        </p>

        <h2 className="text-4xl font-extrabold mb-5">
          Get Up To 50% Off On Trending Products
        </h2>

        <p className="mb-8 max-w-xl mx-auto text-blue-100 dark:text-gray-300">
          Upgrade your shopping experience with special deals and seasonal
          discounts.
        </p>

        <button
          onClick={handleExploreDeals}
          className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-white px-8 py-3.5 rounded-xl font-bold transition shadow-md"
        >
          Explore Deals
        </button>
      </div>
    </section>
  );
}
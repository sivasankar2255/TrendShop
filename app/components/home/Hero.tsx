'use client';

import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "../../store/store";
import Image from "next/image";
import { Sparkles, ShoppingBag } from "lucide-react";

export default function Hero() {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleShopNow = () => {
    if (!isAuthenticated) {
      router.push("/signup");
    } else {
      router.push("/products");
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900/80 px-6 py-20 transition-colors border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Text Content */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            New Season Collection
          </div>

          <AnimatePresence>
            <motion.h1
              className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              Discover Your Latest Fashion & Technology Trends
            </motion.h1>
          </AnimatePresence>

          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-xl">
            Shop stylish clothes, watches, shoes, bags, and premium accessories at the best price.
          </p>

          <div className="pt-2">
            <button
              onClick={handleShopNow}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-extrabold px-8 py-4 rounded-2xl shadow-md transition flex items-center gap-3"
            >
              <ShoppingBag size={20} />
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Column: Clean TrendShop Image without borders */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative h-72 sm:h-96 w-full max-w-md flex items-center justify-center">
            <Image
              src="/images/trendshop.png"
              alt="TrendShop Logo Showcase"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
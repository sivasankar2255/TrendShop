"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Sparkles, ShoppingBag, Star, ArrowRight, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addToCart, increaseQuantity, decreaseQuantity } from "../../store/features/cartSlice";
import type { RootState } from "../../store/store";

const newArrivalsData = [
  {
    id: "new-1",
    name: "Pro Noise-Canceling Headphones",
    category: "Electronics",
    price: 4999,
    originalPrice: 7999,
    rating: 4.9,
    image: "/products/new-arrival-headphones.png",
    badge: "HOT ARRIVAL",
    description: "Studio quality spatial audio with active noise cancellation and 40h battery life.",
    isHero: true,
  },
];

export default function NewArrivals() {
  const [activeTab, setActiveTab] = useState("All");
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});
  const dispatch = useDispatch();
  const router = useRouter();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const categories = ["All", "Electronics", "Fashion", "Shoes", "Bags"];

  const heroItem = newArrivalsData[0];

  const heroCartItem = cartItems.find(
    (item) => item.id.toString() === heroItem.id.toString()
  );

  const gridProducts = (
    activeTab === "All"
      ? newArrivalsData
      : newArrivalsData.filter((p) => p.category === activeTab)
  ).filter((p) => p.id !== heroItem.id);

  const handleAddToCart = (product: typeof newArrivalsData[0]) => {
    if (!isAuthenticated) {
      router.push("/signup");
      return;
    }

    dispatch(
      addToCart({
        id: product.id as any,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    );

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  //const = newArrivalsData[0];

  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-950 transition-colors border-t border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={14} />
              Just Dropped
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              New Arrival Products
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-base">
              Discover our newest luxury releases crafted for perfection.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${activeTab === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Featured Photo Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to from-slate-900 via-blue-950 to-gray-900 text-white border border-gray-800 shadow-2xl grid lg:grid-cols-12 gap-8 p-8 lg:p-12 items-center">
          <div className="lg:col-span-7 space-y-6 z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold tracking-widest uppercase">
              🏆 Best Offers
            </span>

            <h3 className="text-3xl lg:text-5xl font-extrabold leading-tight">
              {heroItem.name}
            </h3>

            <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-xl">
              {heroItem.description}
            </p>

            <div className="flex items-center gap-4">
              <span className="text-3xl lg:text-4xl font-extrabold text-blue-400">
                ₹{heroItem.price.toLocaleString()}
              </span>
              <span className="text-xl text-gray-400 line-through font-medium">
                ₹{heroItem.originalPrice.toLocaleString()}
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-500/30">
                Save {Math.round(((heroItem.originalPrice - heroItem.price) / heroItem.originalPrice) * 100)}%
              </span>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              {heroCartItem ? (
                <div className="flex items-center gap-3 bg-gray-950/80 border border-blue-500/50 p-2 rounded-2xl shadow-xl">
                  <button
                    onClick={() => {
                      if (!isAuthenticated) return router.push("/signup");
                      dispatch(decreaseQuantity(heroItem.id));
                    }}
                    aria-label="Decrease quantity by 1"
                    className="w-11 h-11 bg-gray-800 hover:bg-red-600 text-white rounded-xl font-extrabold text-xl transition flex items-center justify-center shadow-xs"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-sm text-blue-300 px-3">
                    {heroCartItem.quantity} in Cart
                  </span>
                  <button
                    onClick={() => {
                      if (!isAuthenticated) return router.push("/signup");
                      dispatch(increaseQuantity(heroItem.id));
                    }}
                    aria-label="Increase quantity by 1"
                    className="w-11 h-11 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-extrabold text-xl transition flex items-center justify-center shadow-md"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAddToCart(heroItem)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition flex items-center gap-3"
                >
                  {addedIds[heroItem.id] ? (
                    <>
                      <Check size={20} />
                      Added 1 to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={20} />
                      Add 1 to Cart
                    </>
                  )}
                </button>
              )}

              <Link
                href="/products"
                className="border border-gray-700 hover:border-gray-500 text-gray-200 font-semibold px-6 py-4 rounded-2xl transition flex items-center gap-2 hover:bg-gray-800/50"
              >
                Explore All Products <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* High-res Hero Photo Showcase */}
          <div className="lg:col-span-5 relative h-72 lg:h-96 w-full flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-3xl" />
            <Image
              src={heroItem.image}
              alt={heroItem.name}
              fill
              priority
              className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gridProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-xl dark:hover:shadow-gray-950 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Area */}
              <div className="relative h-56 w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden mb-4">
                <span className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider">
                  {product.badge}
                </span>

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Information */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  {product.name}
                </h4>

                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className={`w-full mt-4 py-2.5 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 ${addedIds[product.id]
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-md"
                  }`}
              >
                {addedIds[product.id] ? (
                  <>
                    <Check size={16} /> Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} /> Add to Cart
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

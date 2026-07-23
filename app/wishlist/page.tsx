"use client";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import type { RootState, AppDispatch } from "../store/store";
import { removeFromWishlist, clearWishlist } from "../store/features/wishlistSlice";
import { addToCart } from "../store/features/cartSlice";

export default function WishlistPage() {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector(
    (state: RootState) => state.wishlist.items
  );

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          My Wishlist
        </h1>

        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center bg-white dark:bg-gray-900 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Your wishlist is empty
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Save your favourite products here.
          </p>

          <Link
            href="/products"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          My Wishlist ({items.length})
        </h1>

        <button
          onClick={() => dispatch(clearWishlist())}
          className="text-red-600 dark:text-red-400 hover:text-red-700 font-medium hover:underline transition"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-lg transition bg-white dark:bg-gray-900"
          >
            <div className="relative w-full h-56 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-4"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <h2 className="text-xl font-bold mt-5 text-gray-900 dark:text-white">
              {item.name}
            </h2>

            {item.category && (
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {item.category}
              </p>
            )}

            <p className="text-blue-600 dark:text-blue-400 font-extrabold text-xl mt-3">
              ₹{item.price}
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      quantity: 1,
                    })
                  )
                }
                className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() =>
                  dispatch(removeFromWishlist(item.id))
                }
                className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 text-white font-semibold py-3 rounded-xl transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
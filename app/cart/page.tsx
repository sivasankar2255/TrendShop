"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/features/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector(
    (state: RootState) => state.cart.items
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Shopping Cart</h1>

        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center bg-white dark:bg-gray-900 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Your cart page is empty
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
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>

        <button
          onClick={() => dispatch(clearCart())}
          className="text-red-600 dark:text-red-400 hover:underline font-medium transition"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-white dark:bg-gray-900 shadow-xs"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h2>

                <p className="text-blue-600 dark:text-blue-400 font-bold mt-1">
                  ₹{item.price}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="w-9 h-9 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-bold transition"
                >
                  -
                </button>

                <span className="font-semibold text-gray-900 dark:text-white">{item.quantity}</span>

                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="w-9 h-9 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-bold transition"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white">
                  ₹{item.price * item.quantity}
                </p>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-600 dark:text-red-400 text-sm mt-2 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 h-fit bg-white dark:bg-gray-900 shadow-xs">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Order Summary</h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900 dark:text-white">₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-gray-900 dark:text-white">₹{shipping}</span>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between text-lg font-bold text-gray-900 dark:text-white">
              <span>Total</span>
              <span className="text-blue-600 dark:text-blue-400">₹{total}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-6 w-full inline-block text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xl transition shadow-md"
          >
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}
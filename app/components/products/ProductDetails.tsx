"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { addToCart, increaseQuantity, decreaseQuantity } from "../../store/features/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../store/features/wishlistSlice";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  rating: number;
  stock: number;
  image: string;
};

export default function ProductDetails({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isAdded, setIsAdded] = useState(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const cartItem = cartItems.find((item) => item.id === product.id);

  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  const handleWishlist = () => {
    if (!isAuthenticated) {
      router.push("/signup");
      return;
    }

    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
        })
      );
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push("/signup");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="relative h-96 bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div>
        <p className="text-sm uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
          {product.category}
        </p>

        <h1 className="text-4xl font-extrabold mt-2 text-gray-900 dark:text-white">
          {product.name}
        </h1>

        <p className="mt-3 text-yellow-500 font-medium">
          ⭐ {product.rating} Rating
        </p>

        <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-6">
          ₹{product.price}
        </p>

        <p className="text-gray-600 dark:text-gray-300 mt-6 leading-7">
          {product.description}
        </p>

        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Stock:{" "}
          <span className="font-semibold text-green-600 dark:text-green-400">
            {product.stock} Available
          </span>
        </p>

        <div className="flex gap-4 mt-8">
          {cartItem ? (
            <div className="flex-1 flex items-center justify-between border border-blue-600 dark:border-blue-500 rounded-xl p-2 bg-blue-50 dark:bg-blue-950/50">
              <button
                onClick={() => dispatch(decreaseQuantity(product.id))}
                aria-label="Decrease quantity"
                className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded-lg border border-gray-200 dark:border-gray-700 font-bold text-base transition"
              >
                -
              </button>
              <span className="font-bold text-sm text-blue-900 dark:text-blue-200 px-2">
                {cartItem.quantity} in Cart
              </span>
              <button
                onClick={() => dispatch(increaseQuantity(product.id))}
                aria-label="Increase quantity"
                className="w-9 h-9 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-base transition"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className={`flex-1 text-white px-8 py-3.5 rounded-xl transition flex items-center justify-center gap-2 font-semibold shadow-md ${
                isAdded
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
              }`}
            >
              {isAdded ? (
                <>
                  <span>Added to Cart!</span>
                  <span className="text-xs bg-emerald-700 px-2 py-0.5 rounded-full">+1</span>
                </>
              ) : (
                "Add to Cart"
              )}
            </button>
          )}

          <button
            onClick={handleWishlist}
            className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border font-semibold transition ${
              isWishlisted
                ? "border-red-500 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400"
                : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
            }`}
          >
            <Heart
              size={20}
              className={isWishlisted ? "fill-red-500 text-red-500" : ""}
            />
            <span>{isWishlisted ? "Wishlisted" : "Wishlist"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
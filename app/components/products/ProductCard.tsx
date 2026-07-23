"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../store/store";

import { addToCart, increaseQuantity, decreaseQuantity } from "../../store/features/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../store/features/wishlistSlice";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  badge:string;
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
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
          badge:product.badge,
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
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-lg dark:hover:shadow-gray-950 transition overflow-hidden">
      {/* Product Image */}
      <div className="relative h-60 bg-gray-50 dark:bg-gray-800/50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-4"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-950/50 transition"
        >
          <Heart
            size={22}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-400 dark:text-gray-400"
            }
          />
        </button>
      </div>

      {/* Details */}
      <div className="p-5">
        <p className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 tracking-wider">
          {product.category}
        </p>

        <h2 className="text-lg font-bold mt-1 text-gray-900 dark:text-white line-clamp-1">
          {product.name}
        </h2>

        <p className="text-blue-600 dark:text-blue-400 font-extrabold text-xl mt-2">
          ₹{product.price}
        </p>

        <div className="flex gap-3 mt-5">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 text-center border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Details
          </Link>

          {cartItem ? (
            <div className="flex-1 flex items-center justify-between border border-blue-600 dark:border-blue-500 rounded-xl p-1 bg-blue-50 dark:bg-blue-950/50">
              <button
                onClick={() => dispatch(decreaseQuantity(product.id))}
                aria-label="Decrease quantity"
                className="w-7 h-7 flex items-center justify-center bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded-lg border border-gray-200 dark:border-gray-700 font-bold text-sm transition"
              >
                -
              </button>
              <span className="font-bold text-xs text-blue-900 dark:text-blue-200 px-1">
                {cartItem.quantity} in Cart
              </span>
              <button
                onClick={() => dispatch(increaseQuantity(product.id))}
                aria-label="Increase quantity"
                className="w-7 h-7 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className={`flex-1 text-white py-2 rounded-xl transition flex items-center justify-center gap-1 font-semibold ${
                isAdded
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
              }`}
            >
              {isAdded ? (
                <>
                  <span>Added!</span>
                  <span className="text-xs bg-emerald-700 px-1.5 py-0.5 rounded-full">+1</span>
                </>
              ) : (
                "Add to Cart"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { logout } from "../store/features/authSlice";
import type { RootState } from "../store/store";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6">Customer Profile</h1>

        <div className="border rounded-2xl p-10 text-center bg-white shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">You are not logged in</h2>
          <p className="text-gray-500 mb-6">
            Please register as a customer or login to view your profile.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Customer Signup
            </Link>
            <Link
              href="/login"
              className="border border-gray-300 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg transition"
            >
              Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-18">
      <h1 className="text-3xl font-bold mb-5">My Account Profile</h1>

      <div className="border rounded-2xl p-4 bg-white shadow-sm space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
            {user?.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">Account Type</span>
            <span className="font-semibold text-blue-600">Registered Customer</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">Email Address</span>
            <span className="font-semibold">{user?.email}</span>
          </div>
        </div>

        <button
          onClick={() => dispatch(logout())}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Logout Account
        </button>
      </div>
    </main>
  );
}
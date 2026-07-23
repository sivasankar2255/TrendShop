import Link from "next/link";

export default function MobileMenu() {
  return (
    <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-6 py-5 shadow-lg transition-colors">
      <div className="flex flex-col gap-4 font-medium text-gray-800 dark:text-gray-200">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
        <Link href="/About" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About Us</Link>
        <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</Link>
        <Link href="/products" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Products</Link>
        <Link href="/wishlist" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Wishlist</Link>
        <Link href="/cart" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Cart</Link>
        <Link href="/profile" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Profile</Link>
      </div>
    </div>
  );
}
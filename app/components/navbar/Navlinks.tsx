import Link from "next/link";

export default function NavLinks() {
  return (
    <div className="hidden lg:flex items-center gap-8 font-medium text-gray-700 dark:text-gray-200">
      <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
        Home
      </Link>

      <Link href="/About" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
        About Us
      </Link>

      <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
        Contact
      </Link>

      <Link href="/products" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
        Products
      </Link>
    </div>
  );
}
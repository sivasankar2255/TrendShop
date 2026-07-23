import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="hidden md:flex items-center border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 rounded-full px-4 py-2 w-72 focus-within:ring-2 focus-within:ring-blue-500 transition">
      <Search size={18} className="text-gray-400 dark:text-gray-400 shrink-0" />

      <input
        type="text"
        placeholder="Search products..."
        className="ml-2 w-full bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
      />
    </div>
  );
}
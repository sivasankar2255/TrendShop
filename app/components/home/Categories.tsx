import Image from "next/image";
import { categories } from "../../data/categories";

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center shadow-xs hover:shadow-md transition"
          >
            <div className="relative w-24 h-24 mx-auto mb-3">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="100px"
                className="object-contain"
              />
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
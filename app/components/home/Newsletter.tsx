export default function Newsletter() {
  return (
    <section className="bg-gray-100 dark:bg-gray-900/80 px-6 py-16 transition-colors">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Subscribe to Our Newsletter
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Get latest product updates, offers, and shopping discounts.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
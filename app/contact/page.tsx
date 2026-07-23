export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Contact Us
      </h1>

      <form className="space-y-5 max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-2xl shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
          <input
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
          <input
            type="email"
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Message</label>
          <textarea
            rows={5}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Write your message here..."
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition shadow-md">
          Send Message
        </button>
      </form>
    </main>
  );
}
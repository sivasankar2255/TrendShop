import ProductCard from "../components/products/ProductCard";
import { connectDB } from "@/app/lib/mongdb";
import Product from "@/app/models/Product";
import { products as initialProducts } from "@/app/data/products";

export const revalidate = 0;

async function getProducts() {
  try {
    await connectDB();
    let dbProducts = await Product.find({}).sort({ createdAt: -1 });

    if (dbProducts.length === 0) {
      const seedData = initialProducts.map(({ id, ...rest }) => rest);
      await Product.insertMany(seedData);
      dbProducts = await Product.find({}).sort({ createdAt: -1 });
    }

    return dbProducts.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      price: p.price,
      category: p.category,
      description: p.description,
      rating: p.rating,
      stock: p.stock,
      image: p.image,
      badge: p.badge,
    }));
  } catch (error) {
    console.error("Failed to load products from MongoDB:", error);
    return initialProducts.map((p) => ({ ...p, id: p.id.toString() }));
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Products
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-10">
        Explore our latest trending shopping products.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product as any} />
        ))}
      </div>
    </main>
  );
}


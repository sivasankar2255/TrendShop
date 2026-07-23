import ProductCard from "../products/ProductCard";
import { connectDB } from "@/app/lib/mongdb";
import Product from "@/app/models/Product";
import { products as initialProducts } from "@/app/data/products";

export const revalidate = 0;

async function getFeaturedProducts() {
  try {
    await connectDB();
    let dbProducts = await Product.find({}).limit(4);

    if (dbProducts.length === 0) {
      const seedData = initialProducts.map(({ id, ...rest }) => rest);
      await Product.insertMany(seedData);
      dbProducts = await Product.find({}).limit(4);
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
    }));
  } catch (error) {
    console.error("Failed to load featured products from MongoDB:", error);
    return initialProducts.slice(0, 4).map((p) => ({ ...p, id: p.id.toString() }));
  }
}

export default async function FeaturedProducts() {
  const featured = await getFeaturedProducts();

  return (
    <section className="bg-gray-50 dark:bg-gray-900/50 px-6 py-16 transition-colors">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Featured Products
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      </div>
    </section>
  );
}
import Link from "next/link";
import { connectDB } from "@/app/lib/mongdb";
import Product from "@/app/models/Product";
import ProductDetails from "../../components/products/ProductDetails";
import mongoose from "mongoose";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const revalidate = 0;

export default async function ProductDetailsPage({
  params,
}: ProductPageProps) {
  const { id } = await params;
  await connectDB();

  let rawProduct = null;

  if (mongoose.Types.ObjectId.isValid(id)) {
    rawProduct = await Product.findById(id);
  }

  if (!rawProduct) {
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      const allProducts = await Product.find({});
      if (allProducts[numericId - 1]) {
        rawProduct = allProducts[numericId - 1];
      }
    }
  }

  if (!rawProduct) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Product not found</h1>
        <Link href="/products" className="text-blue-600 mt-5 inline-block hover:underline">
          Back to Products
        </Link>
      </main>
    );
  }

  const product = {
    id: rawProduct._id.toString(),
    name: rawProduct.name,
    price: rawProduct.price,
    category: rawProduct.category,
    description: rawProduct.description,
    rating: rawProduct.rating,
    stock: rawProduct.stock,
    image: rawProduct.image,
    badge: rawProduct.badge,
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <ProductDetails product={product as any} />
    </main>
  );
}

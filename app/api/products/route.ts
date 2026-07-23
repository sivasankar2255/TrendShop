import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongdb";
import Product from "@/app/models/Product";
import { products as initialProducts } from "@/app/data/products";

export async function GET() {
  try {
    await connectDB();

    // Ensure all initial items exist in MongoDB
    for (const item of initialProducts) {
      const { id, ...rest } = item;
      const exists = await Product.findOne({ name: item.name });
      if (!exists) {
        await Product.create(rest);
      }
    }

    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error: any) {
    console.error("Fetch products error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}

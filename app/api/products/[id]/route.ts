import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongdb";
import Product from "@/app/models/Product";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    let product = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    }

    if (!product) {
      // Fallback lookup by legacy numeric ID if passed
      product = await Product.findOne({ name: { $regex: new RegExp(id, "i") } });
    }

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error: any) {
    console.error("Fetch product by ID error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to fetch product",
      },
      { status: 500 }
    );
  }
}

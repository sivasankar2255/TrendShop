import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongdb";
import Order from "@/app/models/Order";
import Cart from "@/app/models/Cart";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const orders = await Order.find({ userEmail: email.toLowerCase().trim() }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    console.error("Fetch orders error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const {
      userEmail,
      items,
      shippingAddress,
      paymentMethod,
      paymentDetails,
      subtotal,
      shipping,
      total,
    } = await req.json();

    if (!userEmail || !items || items.length === 0 || !shippingAddress || !paymentMethod) {
      return NextResponse.json(
        { success: false, message: "Missing required order checkout information" },
        { status: 400 }
      );
    }

    await connectDB();
    const normalizedEmail = userEmail.toLowerCase().trim();

    const newOrder = await Order.create({
      userEmail: normalizedEmail,
      items,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
      paymentDetails: paymentDetails || {},
      subtotal,
      shipping: shipping || 0,
      total,
      status: "Processing",
    });

    // Clear cart in MongoDB after placing order
    await Cart.findOneAndUpdate({ userEmail: normalizedEmail }, { items: [] });

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully in MongoDB",
        order: newOrder,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to place order" },
      { status: 500 }
    );
  }
}

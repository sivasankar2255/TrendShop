import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongdb";
import Wishlist from "@/app/models/Wishlist";

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

    let wishlist = await Wishlist.findOne({ userEmail: email.toLowerCase().trim() });
    if (!wishlist) {
      wishlist = await Wishlist.create({ userEmail: email.toLowerCase().trim(), items: [] });
    }

    return NextResponse.json({
      success: true,
      wishlist: wishlist.items,
    });
  } catch (error: any) {
    console.error("Fetch wishlist error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { email, item, action } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const userEmail = email.toLowerCase().trim();

    let wishlist = await Wishlist.findOne({ userEmail });
    if (!wishlist) {
      wishlist = new Wishlist({ userEmail, items: [] });
    }

    if (action === "add" && item) {
      const exists = wishlist.items.some(
        (i) => i.productId.toString() === item.productId.toString()
      );
      if (!exists) {
        wishlist.items.push({
          productId: item.productId,
          name: item.name,
          price: item.price,
          category: item.category,
          image: item.image,
        });
      }
    } else if (action === "remove" && item) {
      wishlist.items = wishlist.items.filter(
        (i) => i.productId.toString() !== item.productId.toString()
      );
    } else if (action === "clear") {
      wishlist.items = [];
    }

    await wishlist.save();

    return NextResponse.json({
      success: true,
      message: "Wishlist updated in MongoDB",
      wishlist: wishlist.items,
    });
  } catch (error: any) {
    console.error("Update wishlist error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to update wishlist" },
      { status: 500 }
    );
  }
}

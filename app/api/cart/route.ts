import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongdb";
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

    let cart = await Cart.findOne({ userEmail: email.toLowerCase().trim() });
    if (!cart) {
      cart = await Cart.create({ userEmail: email.toLowerCase().trim(), items: [] });
    }

    return NextResponse.json({
      success: true,
      cart: cart.items,
    });
  } catch (error: any) {
    console.error("Fetch cart error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to fetch cart" },
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

    let cart = await Cart.findOne({ userEmail });
    if (!cart) {
      cart = new Cart({ userEmail, items: [] });
    }

    if (action === "clear") {
      cart.items = [];
    } else if (action === "add" && item) {
      const existingIndex = cart.items.findIndex(
        (i) => i.productId.toString() === item.productId.toString()
      );
      if (existingIndex > -1) {
        cart.items[existingIndex].quantity += item.quantity || 1;
      } else {
        cart.items.push({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          image: item.image,
        });
      }
    } else if (action === "increase" && item) {
      const existingIndex = cart.items.findIndex(
        (i) => i.productId.toString() === item.productId.toString()
      );
      if (existingIndex > -1) {
        cart.items[existingIndex].quantity += 1;
      }
    } else if (action === "decrease" && item) {
      const existingIndex = cart.items.findIndex(
        (i) => i.productId.toString() === item.productId.toString()
      );
      if (existingIndex > -1) {
        if (cart.items[existingIndex].quantity > 1) {
          cart.items[existingIndex].quantity -= 1;
        } else {
          cart.items.splice(existingIndex, 1);
        }
      }
    } else if (action === "remove" && item) {
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== item.productId.toString()
      );
    }

    await cart.save();

    return NextResponse.json({
      success: true,
      message: "Cart updated in MongoDB",
      cart: cart.items,
    });
  } catch (error: any) {
    console.error("Update cart error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to update cart" },
      { status: 500 }
    );
  }
}

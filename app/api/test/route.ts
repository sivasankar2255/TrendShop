import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongdb";

export async function GET() {
    try {
        await connectDB();

        return NextResponse.json({
            success: true,
            message: "MongoDB Connected Successfully",
        });
    } catch (error: any) {
        console.error("MongoDB Connection Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "MongoDB Connection Failed",
                error: error?.message || String(error),
            },
            { status: 500 }
        );
    }
}
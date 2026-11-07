import { NextResponse } from "next/server";
import { getAllFaculty } from "@/lib/sqlite";

export async function GET() {
  try {
    const items = getAllFaculty();
    return NextResponse.json(items);
  } catch (error) {
    console.error("Portal faculty GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch faculty" },
      { status: 500 }
    );
  }
}


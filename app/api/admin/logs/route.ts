import { NextResponse } from "next/server";
import { getChatLogs } from "@/lib/sqlite";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") || 50);
    const logs = getChatLogs(limit);
    return NextResponse.json(logs);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch chat logs" },
      { status: 500 }
    );
  }
}

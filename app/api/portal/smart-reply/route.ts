import { NextResponse } from "next/server";
import { searchSmartReply } from "@/lib/sqlite";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = String(body.message ?? body.query ?? "").trim();

    if (!query) {
      return NextResponse.json(
        { error: "กรุณาระบุข้อความคำถาม" },
        { status: 400 }
      );
    }

    const result = searchSmartReply(query);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in smart-reply API:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการประมวลผลคำตอบ" },
      { status: 500 }
    );
  }
}

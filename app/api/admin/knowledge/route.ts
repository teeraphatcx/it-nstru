import { NextResponse } from "next/server";
import {
  createKnowledge,
  deleteKnowledge,
  getAllKnowledge,
  updateKnowledge,
} from "@/lib/sqlite";

export async function GET() {
  try {
    const list = getAllKnowledge();
    return NextResponse.json(list);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch knowledge list" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic, keywords, response, followUps } = body;

    if (!topic || !response) {
      return NextResponse.json(
        { error: "หัวข้อและคำตอบไม่สามารถเว้นว่างได้" },
        { status: 400 }
      );
    }

    const kwArray = Array.isArray(keywords)
      ? keywords
      : String(keywords || "")
          .split(",")
          .map((k: string) => k.trim())
          .filter(Boolean);

    const fuArray = Array.isArray(followUps)
      ? followUps
      : String(followUps || "")
          .split(",")
          .map((f: string) => f.trim())
          .filter(Boolean);

    const created = createKnowledge(topic, kwArray, response, fuArray);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create knowledge item" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, topic, keywords, response, followUps } = body;

    if (!id || !topic || !response) {
      return NextResponse.json(
        { error: "ข้อมูลไม่ครบถ้วนสำหรับการแก้ไข" },
        { status: 400 }
      );
    }

    const kwArray = Array.isArray(keywords)
      ? keywords
      : String(keywords || "")
          .split(",")
          .map((k: string) => k.trim())
          .filter(Boolean);

    const fuArray = Array.isArray(followUps)
      ? followUps
      : String(followUps || "")
          .split(",")
          .map((f: string) => f.trim())
          .filter(Boolean);

    const success = updateKnowledge(
      Number(id),
      topic,
      kwArray,
      response,
      fuArray
    );
    if (!success) {
      return NextResponse.json(
        { error: "ไม่พบข้อมูลที่ต้องการแก้ไข" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update knowledge item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing id parameter" },
        { status: 400 }
      );
    }

    const success = deleteKnowledge(Number(id));
    return NextResponse.json({ success });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete knowledge item" },
      { status: 500 }
    );
  }
}

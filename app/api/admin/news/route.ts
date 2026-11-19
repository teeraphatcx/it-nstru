import { NextResponse } from "next/server";
import { createNews, deleteNews, getAllNews } from "@/lib/sqlite";

export async function GET() {
  try {
    const list = getAllNews();
    return NextResponse.json(list);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, category, linkUrl } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "หัวข้อและเนื้อหาข่าวไม่สามารถเว้นว่างได้" },
        { status: 400 }
      );
    }

    const created = createNews(title, content, category || "ทั่วไป", linkUrl);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create news" },
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

    const success = deleteNews(Number(id));
    return NextResponse.json({ success });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}

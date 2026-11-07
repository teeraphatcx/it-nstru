import { NextResponse } from "next/server";
import { isFestivalThemeId } from "@/lib/festival-themes";
import { getFestivalThemeSetting, setSiteSetting } from "@/lib/sqlite";

export function GET() {
  try {
    return NextResponse.json({
      festivalTheme: getFestivalThemeSetting(),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const festivalTheme = String(body.festivalTheme ?? "");

    if (!isFestivalThemeId(festivalTheme)) {
      return NextResponse.json(
        { error: "ธีมเทศกาลที่เลือกไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    setSiteSetting("festivalTheme", festivalTheme);
    return NextResponse.json({ festivalTheme, success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}

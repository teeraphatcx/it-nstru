import { NextResponse } from "next/server";
import { getFestivalThemeSetting } from "@/lib/sqlite";

export function GET() {
  try {
    return NextResponse.json({
      festivalTheme: getFestivalThemeSetting(),
    });
  } catch {
    return NextResponse.json({ festivalTheme: "none" }, { status: 200 });
  }
}

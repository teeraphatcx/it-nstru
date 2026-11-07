import { NextRequest, NextResponse } from "next/server";
import {
  getAllFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from "@/lib/sqlite";

export async function GET() {
  try {
    const items = getAllFaculty();
    return NextResponse.json(items);
  } catch (error) {
    console.error("Faculty GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch faculty" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      rank,
      position,
      degree,
      specialty,
      email,
      image,
      portfolio,
      scholar,
      gender,
      sortOrder,
    } = body;

    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    // specialty: accept array or string
    const specialtyStr = Array.isArray(specialty)
      ? JSON.stringify(specialty)
      : specialty || "[]";

    const item = createFaculty({
      name,
      rank: rank || "",
      position: position || "อาจารย์ประจำหลักสูตรเทคโนโลยีสารสนเทศ",
      degree: degree || "",
      specialty: specialtyStr,
      email: email || "",
      image: image || "",
      portfolio: portfolio || "",
      scholar: scholar || "",
      gender: gender || "male",
      sortOrder: sortOrder ?? 99,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Faculty POST error:", error);
    return NextResponse.json(
      { error: "Failed to create faculty" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, specialty, ...rest } = body;

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    // Convert specialty array to JSON string if needed
    const specialtyStr =
      specialty !== undefined
        ? Array.isArray(specialty)
          ? JSON.stringify(specialty)
          : specialty
        : undefined;

    const ok = updateFaculty(id, {
      ...rest,
      ...(specialtyStr !== undefined ? { specialty: specialtyStr } : {}),
    });

    if (!ok) {
      return NextResponse.json(
        { error: "Faculty not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Faculty PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update faculty" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const ok = deleteFaculty(id);
    if (!ok) {
      return NextResponse.json(
        { error: "Faculty not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Faculty DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete faculty" },
      { status: 500 }
    );
  }
}


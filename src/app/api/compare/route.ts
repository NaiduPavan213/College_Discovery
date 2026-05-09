import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get("ids");

    if (!idsParam) {
      return NextResponse.json(
        { error: "No college IDs provided" },
        { status: 400 }
      );
    }

    const ids = idsParam
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));

    if (ids.length < 2 || ids.length > 3) {
      return NextResponse.json(
        { error: "Please provide 2 or 3 college IDs" },
        { status: 400 }
      );
    }

    const colleges = await prisma.college.findMany({
      where: { id: { in: ids } },
      include: { courses: true },
    });

    if (colleges.length !== ids.length) {
      return NextResponse.json(
        { error: "One or more colleges not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ colleges });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch colleges for comparison" },
      { status: 500 }
    );
  }
}
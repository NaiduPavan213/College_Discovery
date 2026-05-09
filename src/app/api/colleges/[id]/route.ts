import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid college ID" },
        { status: 400 }
      );
    }

    const college = await prisma.college.findUnique({
      where: { id },
      include: { courses: true },
    });

    if (!college) {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(college);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch college" },
      { status: 500 }
    );
  }
}
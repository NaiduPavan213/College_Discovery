import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const state = searchParams.get("state") || "";
    const maxFees = searchParams.get("maxFees");
    const sort = searchParams.get("sort") || "rating_desc";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    const where = {
      ...(search && {
        name: { contains: search, mode: "insensitive" as const },
      }),
      ...(state && { state }),
      ...(maxFees && { fees_per_year: { lte: parseInt(maxFees) } }),
    };

    const lastUnderscoreIndex = sort.lastIndexOf("_");
    const key = sort.substring(0, lastUnderscoreIndex);
    const order = sort.substring(lastUnderscoreIndex + 1);
    const orderBy = { [key]: order };

    const [data, total] = await Promise.all([
      prisma.college.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      prisma.college.count({ where }),
    ]);

    return NextResponse.json({
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch colleges" },
      { status: 500 }
    );
  }
}
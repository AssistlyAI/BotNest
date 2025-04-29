import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  console.log(userId);
  try {
    const user = await prismaClient.user.findUnique({
      where: { userId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        error: `Error retrieving user: ${(e as Error).message}`,
      },
      { status: 500 }
    );
  }
}

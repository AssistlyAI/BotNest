import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, userName, userEmail } = body;

  try {
    await prismaClient.user.upsert({
      where: { userId },
      create: { userId, userName, userEmail },
      update: { userName, userEmail },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}

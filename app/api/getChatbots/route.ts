import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const chatbots = await prismaClient.chatbot.findMany({
      where: {
        userId,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json(chatbots, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        error: `Error fetching chatbots: ${(e as Error).message}`,
      },
      { status: 500 }
    );
  }
}

import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { id, content } = body;

  try {
    await prismaClient.chatbotCharacteristics.create({
      data: {
        chatbotId: id,
        content,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Adding chatbotCharacteristics error:", error);
    return NextResponse.json(
      { error: "Failed to add chatbotCharacteristics" },
      { status: 500 }
    );
  }
}

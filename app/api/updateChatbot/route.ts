import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { id, chatbotName } = body;

  try {
    await prismaClient.chatbot.update({
      where: { id },
      data: {
        name: chatbotName,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update Chatbot error:", error);
    return NextResponse.json(
      { error: "Failed to Update Chatbot" },
      { status: 500 }
    );
  }
}

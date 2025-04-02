import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const chatbotId = searchParams.get("chatbotId");

  if (!chatbotId) {
    return NextResponse.json(
      { error: "chatbot ID is required" },
      { status: 400 }
    );
  }

  try {
    const chatbot = await prismaClient.chatbot.findFirst({
      where: {
        id: chatbotId,
      },
      include: {
        characteristics: true,
        chatSessions: true,
      },
    });

    return NextResponse.json(chatbot, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        error: `Error fetching chatbot: ${(e as Error).message}`,
      },
      { status: 500 }
    );
  }
}

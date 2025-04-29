import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const chatbotId = searchParams.get("chatbotId");

  if (!chatbotId) {
    return NextResponse.json(
      { error: "chatbot ID is required" },
      { status: 400 }
    );
  }

  try {
    // Step 1: Delete all messages related to the chatbot's sessions
    await prismaClient.message.deleteMany({
      where: {
        chatSession: {
          chatbotId,
        },
      },
    });

    // Step 2: Delete all chat sessions
    await prismaClient.chatSession.deleteMany({
      where: { chatbotId },
    });

    // Step 3: Delete chatbot characteristics
    await prismaClient.chatbotCharacteristics.deleteMany({
      where: { chatbotId },
    });

    // Step 4: Finally delete the chatbot
    await prismaClient.chatbot.delete({
      where: { id: chatbotId },
    });

    return NextResponse.json(
      { message: `Deleted the chatbot with id: ${chatbotId}` },
      { status: 200 }
    );
  } catch (e) {
    console.error("Delete error:", e);
    return NextResponse.json(
      {
        error: `Error deleting chatbot: ${(e as Error).message}`,
      },
      { status: 500 }
    );
  }
}

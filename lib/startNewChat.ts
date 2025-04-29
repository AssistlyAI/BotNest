"use server";
import { prismaClient } from "@/lib/prisma";

export async function startNewChat(
  guestName: string,
  guestEmail: string,
  chatbotId: string // assuming chatbotId is a string (UUID)
): Promise<string> {
  try {
    // 1. Create guest (or reuse if email already exists — optional logic)
    const guest = await prismaClient.guest.create({
      data: {
        name: guestName,
        email: guestEmail,
      },
    });

    // 2. Create new chat session
    const chatSession = await prismaClient.chatSession.create({
      data: {
        chatbotId: chatbotId,
        guestId: guest.id,
      },
    });

    // 3. Add initial AI message
    await prismaClient.message.create({
      data: {
        chatSessionId: chatSession.id,
        sender: "ai",
        content: `Welcome ${guestName}!\nHow can I assist you today 😀`,
      },
    });

    console.log("New Chat Session started successfully");

    return chatSession.id;
  } catch (error) {
    console.error("Error starting new chat session:", error);
    return "";
  }
}

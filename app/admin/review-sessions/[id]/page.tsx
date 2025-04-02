"use server";
import Messages, { Message } from "@/components/Messages";
import { prismaClient } from "@/lib/prisma";

async function ReviewSession({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chatSession = await prismaClient.chatSession.findUnique({
    where: {
      id,
    },
    include: {
      messages: true,
      chatbot: {
        select: { name: true },
      },
      guest: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  const normalizedMessages: Message[] = (chatSession?.messages ?? []).map(
    (msg) => ({
      id: msg.id,
      content: msg.content,
      created_at: msg.created_at.toISOString(),
      sender: msg.sender as "user" | "ai",
      chatSessionId: msg.chatSessionId, // ✅ camelCase to match interface
    })
  );

  return (
    <div className="flex-1 p-10 pb-24">
      <h1 className="text-xl lg:text-3xl font-semibold">Session Review</h1>
      <p className="font-light text-xs text-gray-400 mt-2">
        Started at {new Date().toLocaleString()}
      </p>
      <h2 className="font-light mt-2">
        Between {chatSession?.chatbot.name} &{" "}
        <span className="font-extrabold">
          {chatSession?.guest.name} ({chatSession?.guest.email})
        </span>
      </h2>
      <hr className="my-10" />
      <Messages
        messages={normalizedMessages}
        chatbotName={chatSession?.guest.name!}
      />
    </div>
  );
}
export default ReviewSession;

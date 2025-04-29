import ChatBotSessions from "@/components/ChatBotSessions";
import { prismaClient } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

async function ReviewSessions() {
  const { userId } = await auth();

  if (!userId) return;

  const sortedChatbotsByUser = await prismaClient.chatbot.findMany({
    where: { userId },
    orderBy: {
      created_at: "desc",
    },
    include: {
      characteristics: true,
      chatSessions: {
        include: {
          guest: true,
        },
      },
    },
  });

  return (
    <div className="flex-1 px-10">
      <h1 className="text-xl lg:text-3xl font-semibold mt-10">Sessions</h1>
      <h2 className="mb-5">
        Review all the chat sessions the chatbots have had with your customers.
      </h2>

      <ChatBotSessions chatbots={sortedChatbotsByUser} />
    </div>
  );
}
export default ReviewSessions;

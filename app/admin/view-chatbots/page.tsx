"use server";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { prismaClient } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

async function ViewChatbots() {
  const { userId } = await auth();
  if (!userId) {
    return;
  }
  //Get the chatbots using the clerk_id
  const sortedChatbotsByUser = await prismaClient.chatbot.findMany({
    where: { userId },
    orderBy: {
      created_at: "desc",
    },
    include: {
      characteristics: true,
      chatSessions: true,
    },
  });

  return (
    <div className=" flex-1 pb-10 p-20">
      <h1 className="text-xl lg:text-3xl font-semibold mb-5">
        Active Chatbots
      </h1>
      {sortedChatbotsByUser.length === 0 && (
        <div>
          <p>
            You have not created any chatbots yet,Click on the button below to
            create one.
          </p>
          <Link href="/create-chatbot">
            <Button className="bg-[#64B5F5] text-white rounded-md p-3 mt-5">
              Create Chatbot
            </Button>
          </Link>
        </div>
      )}
      <ul className="flex flex-col space-y-5">
        {sortedChatbotsByUser.map((chatbot) => (
          <Link key={chatbot.id} href={`/admin/edit-chatbot/${chatbot.id}`}>
            <li className="relative p-10 border rounded-md max-w-3xl bg-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Avatar seed={chatbot.name} />
                  <h2 className="text-xl font-bold">{chatbot.name}</h2>
                </div>
                <p className="absolute top-5 right-5 text-gray-400 text-xs">
                  Created: {new Date(chatbot.created_at).toLocaleString()}
                </p>
              </div>
              <hr className="mt-2" />
              <div className="grid grid-cols-2 gap-10 md:ga-5 p-5">
                <h3 className="italic">Characteristics:</h3>
                <ul className="text-xs">
                  {chatbot.characteristics.length === 0 && (
                    <p>No characteristics added yet.</p>
                  )}
                  {chatbot.characteristics.map((characteristic) => (
                    <li
                      className="list-disc break-words"
                      key={characteristic.id}
                    >
                      {characteristic.content}
                    </li>
                  ))}
                </ul>
                <h3 className="italic">No of Sessions:</h3>
                <p>{chatbot.chatSessions.length}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
export default ViewChatbots;

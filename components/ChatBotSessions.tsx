"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Avatar from "./Avatar";
import Link from "next/link";
import ReactTimeago from "react-timeago";

interface ChatSession {
  id: string;
  guest: {
    name: string;
    email: string;
  };
  created_at: string | Date;
}

interface Chatbot {
  id: string;
  name: string;
  chatSessions: ChatSession[];
}

function ChatBotSessions({ chatbots }: { chatbots: Chatbot[] }) {
  const [sortedChatbots, setSortedChatbots] = useState<Chatbot[]>(chatbots);

  useEffect(() => {
    const sortedArray = [...chatbots].sort(
      (a, b) => b.chatSessions.length - a.chatSessions.length
    );
    setSortedChatbots(sortedArray);
  }, [chatbots]);

  return (
    <div className="bg-white">
      <Accordion type="single" collapsible>
        {sortedChatbots.map((chatbot) => {
          const hasSessions = chatbot.chatSessions.length > 0;
          return (
            <AccordionItem
              key={chatbot.id}
              value={`item-${chatbot.id}`}
              className="px-10 py-5 items-center"
            >
              {hasSessions ? (
                <>
                  <AccordionTrigger>
                    <div className="flex text-left items-center w-full space-x-4">
                      <Avatar seed={chatbot.name} />
                      <div className="flex flex-1 justify-between">
                        <p>{chatbot.name}</p>
                        <p className="pr-4 font-bold text-right">
                          {chatbot.chatSessions.length} Sessions
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-gray-100 px-5 pt-5 space-y-5 rounded-md">
                    {chatbot.chatSessions.map((session) => (
                      <Link
                        href={`/admin/review-sessions/${session.id}`}
                        key={session.id}
                        className="relative p-5 bg-[#2991EE] text-white rounded-md block"
                      >
                        <p className="text-lg font-bold">
                          {session.guest?.name || "Anonymous"}
                        </p>
                        <p className="text-sm font-light">
                          {session.guest?.email || "Anonymous"}
                        </p>
                        <p className="absolute top-5 right-5 text-sm">
                          <ReactTimeago date={new Date(session.created_at)} />
                        </p>
                      </Link>
                    ))}
                  </AccordionContent>
                </>
              ) : (
                <p className="font-light">{chatbot.name} No Sessions</p>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
export default ChatBotSessions;

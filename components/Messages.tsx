"use client";
import { usePathname } from "next/navigation";
import Avatar from "./Avatar";
import { UserCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef } from "react";

export interface Message {
  id: string | number;
  content: string;
  created_at: string;
  sender: "ai" | "user";
  chatSessionId: string;
}

function Messages({
  messages,
  chatbotName,
}: {
  messages: Message[];
  chatbotName: string;
}) {
  const path = usePathname();
  const isReviewsPage = path.includes("/review-sessions");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto space-y-10 py-10 px-5 bg-white rounded-lg">
      {messages.map((message) => {
        const isSender = message.sender !== "user";
        return (
          <div
            key={message.id}
            className={`chat ${isSender ? "chat-start" : "chat-end"} relative`}
          >
            {isReviewsPage && (
              <p className="absolute -bottom-5 text-gray-300 text-xs">
                Sent {new Date(message.created_at).toLocaleString()}
              </p>
            )}
            <div className={`chat-image avatar w-10 ${!isSender && "-mr-4"}`}>
              {isSender ? (
                <div>
                  <Avatar
                    seed={chatbotName}
                    className="w-12 h-12 bg-white rounded-full border-2 border-[#2991EE] "
                  />
                </div>
              ) : (
                <UserCircle className="text-[#2991EE]" />
              )}
            </div>
            <p
              className={`chat-bubble text-white ${
                isSender
                  ? "chat-bubble-primary bg-[#4D7DFB]"
                  : "chat-bubble-secondary bg-gray-200 text-gray-700"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[[remarkGfm]]}
                // className={"break-words"}
                components={{
                  ul: ({ node, ...props }) => (
                    <ul
                      {...props}
                      className="list-disc list-inside ml-5 mb-5"
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ul
                      {...props}
                      className="list-decimal list-inside ml-5 mb-5"
                    />
                  ),
                  h1: ({ node, ...props }) => (
                    <h1 {...props} className="text-2xl font-bold mb-5" />
                  ),
                  h2: ({ node, ...props }) => (
                    <h1 {...props} className="text-xl font-bold mb-5" />
                  ),
                  h3: ({ node, ...props }) => (
                    <h1 {...props} className="text-lg font-bold mb-5" />
                  ),
                  table: ({ node, ...props }) => (
                    <table
                      {...props}
                      className="table-auto w-full border-separate border-2 rounded-sm border-spacing-4 border-white mb-5"
                    />
                  ),
                  th: ({ node, ...props }) => (
                    <th {...props} className="text-left underline" />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      {...props}
                      className={`whitespace-break-spaces mb-5 ${
                        message.content == "Thinking..." && "animate-pulse"
                      } ${isSender ? "text-white" : "text-gray-700"}`}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      className={"font-bold underline hover:text-blue-400"}
                      rel="noopener noreferrer"
                    />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </p>
          </div>
        );
      })}
      <div ref={ref} />
    </div>
  );
}
export default Messages;

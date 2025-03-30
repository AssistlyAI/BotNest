"use client";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

function CreateChatBot() {
  const { user } = useUser();
  const userId = user?.id;
  const [chatbotName, setChatbotName] = useState<string>("");
  const [isCreating, setIsCreating] = useState(false);

  const handleChatbot = async () => {
    const name = chatbotName;
    setChatbotName("");
    setIsCreating(true);
    try {
      await fetch("/api/createChatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, userId }),
      });

      setIsCreating(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center md:flex-row bg-white p-10 rounded-md m-10">
      <Avatar seed="Virtual Chatbot" className="w-12 h-12 mr-2" />
      <div>
        <h1 className="text-xl lg:text-3xl font-semobold">Create</h1>
        <h2 className="font-light">
          Create a new chatbot for the conversation to assist you.
        </h2>
        <Input
          placeholder="Chatbot Name"
          value={chatbotName}
          onChange={(e) => setChatbotName(e.target.value)}
        />
        <Button
          className="p-10 mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          disabled={!chatbotName}
          onClick={handleChatbot}
        >
          {isCreating ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            " Create Chatbot"
          )}
        </Button>
      </div>
    </div>
  );
}

export default CreateChatBot;

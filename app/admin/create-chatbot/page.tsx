"use client";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubscription } from "@/hooks/useSubscription";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function CreateChatBot() {
  const { user } = useUser();
  const userId = user?.id;
  const [chatbotName, setChatbotName] = useState<string>("");
  const [isCreating, setIsCreating] = useState(false);
  const { hasActiveMembership, userLimit } = useSubscription();
  const router = useRouter();

  const handleChatbot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setIsCreating(true);

    try {
      // Fetch chatbot count
      const countRes = await fetch(`/api/getChatbots?userId=${userId}`);
      const chatbots = await countRes.json();
      if (chatbots.length >= userLimit!) {
        toast({
          variant: "destructive",
          title: "Chatbot Limit Reached",
          description:
            "You've reached the maximum number of chatbots for your current plan. Please upgrade to add more.",
        });
        return;
      }

      // Create chatbot
      await fetch("/api/createChatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: chatbotName, userId }),
      });

      toast({
        title: "Success",
        description: "Chatbot created successfully.",
      });

      setChatbotName("");

      setTimeout(() => {
        router.push("/admin/view-chatbots"); // 
      }, 1500);
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create chatbot.",
      });
    } finally {
      setIsCreating(false);
    }
  };

  if (!user) {
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:space-x-10 bg-white rounded-md p-10 m-10">
      <Avatar seed="create-chatbot" />
      <div>
        <h1 className="text-xl lg:text-3xl font-semibold">Create</h1>
        <h2 className="font-light">
          Create a new chatbot to assist you in your conversations with your
          customers
        </h2>
        <form
          onSubmit={handleChatbot}
          className="flex flex-col md:flex-row gap-2 mt-5"
        >
          <Input
            type="text"
            value={chatbotName}
            onChange={(e) => setChatbotName(e.target.value)}
            placeholder="Chatbot Name..."
            className="max-w-lg"
            required
          />
          <Button disabled={!chatbotName}>
            {isCreating ? "Creating Chatbot..." : "Create Chatbot"}
          </Button>
        </form>
        <p className="text-gray-300 mt-5">Example: Customer Support Chatbot</p>
      </div>
    </div>
  );
}

export default CreateChatBot;

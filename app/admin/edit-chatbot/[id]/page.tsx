"use client";
import Avatar from "@/components/Avatar";
import Characteristic from "@/components/Characteristic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import getBaseUrl from "@/lib/getBaseUrl";
import { Copy } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, use, useEffect, useState } from "react";
import { useSubscription } from "@/hooks/useSubscription";

type Characteristics = {
  id: string;
  content: string;
};

export type ChatbotData = {
  characteristics: Characteristics[];
  id: string;
  name: string;
};
const PRO = 2000;
const FREE = 5;

function EditChatbot({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [url, setUrl] = useState<string>("");
  const [chatbotName, setChatBotName] = useState<string>("");
  const [newCharacteristic, setNewCharacteristic] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ChatbotData>();
  const { hasActiveMembership } = useSubscription();
  const limit = hasActiveMembership ? PRO : FREE;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/getChatbotById?chatbotId=${id}`);
      const json = await response.json();
      setData(json);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const url = `${getBaseUrl()}/guest/chatbot/${id}`;

    setUrl(url);
  }, [id]);

  useEffect(() => {
    if (data) {
      setChatBotName(data.name);
    }
  }, [data]);

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your chatbot?"
    );
    if (!isConfirmed) return;

    try {
      toast({
        title: "Deleting...",
      });

      const result = await fetch(`/api/deleteChatbotById?chatbotId=${id}`, {
        method: "DELETE",
      });
      f;

      if (result) {
        toast({
          title: "Success",
          description: "Chatbot Successfully Deleted",
        });
      }

      router.push("/admin/view-chatbots");
    } catch (error) {
      console.error("Error deleting the chatbot:", error);
      toast({
        title: "Error",
        description: "Failed to delete the chatbot",
        variant: "destructive",
      });
    }
  };

  const handleNewCharacteristic = async (newCharacteristic: string) => {
    if (!data || data.characteristics.length > limit) {
      toast({
        variant: "destructive",
        title: "Chatbot Characteristics Limit Reached",
        description:
          "You've reached the maximum number of chatbot Characteristics for your current plan. Please upgrade to add more.",
      });
      return;
    }
    try {
      toast({
        title: "Adding...",
        description: "Please wait while we add the information",
      });

      const response = await fetch("/api/createCharacteristic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          content: newCharacteristic,
        }),
      });
      const created = await response.json();

      toast({
        title: "Success",
        description: "Information Added",
      });

      setData((prev) => {
        if (!prev) return undefined;

        return {
          ...prev,
          characteristics: [
            ...prev.characteristics,
            {
              id: created?.id || Math.random().toString(),
              content: newCharacteristic,
            },
          ],
        };
      });
      setNewCharacteristic("");
    } catch (error) {
      console.log("Failed to add Characteristic:", error);
    }
  };

  const handleUpdateChatbot = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      toast({
        title: "Updating...",
      });
      console.log("Updating with:", { id, chatbotName });
      const response = await fetch("/api/updateChatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          chatbotName,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "ChatbotName Successfully Updated!",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update the chatbot",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("Failed to update the chatbot:", error);
    }
  };

  //Removing the characteristic from the ui immediately
  const removeCharacteristic = (characteristicId: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        characteristics: prev.characteristics.filter(
          (c) => c.id !== characteristicId
        ),
      };
    });
  };

  if (loading) {
    return (
      <div className="mx-auto animate-spin p-10">
        <Avatar seed="Rejuvate Support Agent" />
      </div>
    );
  }

  if (!data) {
    return redirect("/view-chatbots");
  }
  return (
    <div className="px-0 md:p-10">
      <div className="md:sticky md:top-0 z-50 ml-auto sm:max-w-sm space-y-2 md:border p-5 rounded-b-lg md:rounded-lg bg-[#2991EE]">
        <h2 className="text-sm text-white font-bold">Link to Chat</h2>
        <p className="text-sm italic text-white">
          Share this links to the customers to start the conversation with your
          chatbot
        </p>
        <div className="flex items-center space-x-2">
          <Link href={url} className="w-full cursor-pointer hover:opacity-50">
            <Input value={url} readOnly className="cursor-pointer bg-white" />
          </Link>
          <Button
            size="sm"
            className="px-3"
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast({
                title: "Copied to Clipboard",
                description: "The URL has been copied to your clipboard.",
              });
            }}
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <section className="relative bg-white p-5 mt-5 md:pd-10 rounded-lg ">
        <Button
          variant="destructive"
          className="absolute top-2 right-2 h-8 w-2"
          onClick={() => {
            handleDelete(id);
          }}
        >
          X
        </Button>
        <div className="flex space-x-4">
          <Avatar seed={chatbotName} />
          <form
            className="flex flex-1 items-center space-x-2"
            onSubmit={handleUpdateChatbot}
          >
            <Input
              type="text"
              placeholder={chatbotName}
              value={chatbotName}
              onChange={(e) => setChatBotName(e.target.value)}
              required
              className="w-full border-none bg-transparent font-bold text-xl"
            />
            <Button disabled={!chatbotName} type="submit">
              Update
            </Button>
          </form>
        </div>
        <h2 className="text-xl font-bold mt-10">
          Heres is what your AI Knows...
        </h2>
        <p>
          Your chatbot is equipped with the following information to assist you
          in your conversations with your customers and users
        </p>
        <div className="bg-gray-200 p-5 md:p-5 rounded-md mt-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNewCharacteristic(newCharacteristic);
              setNewCharacteristic("");
            }}
            className="flex space-x-2 mb-5"
          >
            <Input
              type="text"
              placeholder="Example: If customer asks for prices, provide pricing page: www.example.cpm/pricing"
              value={newCharacteristic}
              onChange={(e) => setNewCharacteristic(e.target.value)}
            />
            <Button type="submit" disabled={!newCharacteristic}>
              Add
            </Button>
          </form>
          <ul className="flex flex-wrap-reverse gap-5">
            {data.characteristics.map((characteristic: any) => (
              <Characteristic
                key={characteristic.id}
                characteristic={characteristic}
                onDelete={() => removeCharacteristic(characteristic.id)}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
export default EditChatbot;

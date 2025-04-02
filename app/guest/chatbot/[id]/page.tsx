"use client";
import Avatar from "@/components/Avatar";
import Messages, { Message } from "@/components/Messages";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChatbotData } from "@/app/admin/edit-chatbot/[id]/page";
import { startNewChat } from "@/lib/startNewChat";

const formSchema = z.object({
  message: z.string().min(2, "Username must be at least 2 characters."),
});

function ChatbotPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [chatId, setChatId] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatbotData, setChatbotData] = useState<ChatbotData>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch chatbot data
        const chatbotRes = await fetch(`/api/getChatbotById?chatbotId=${id}`);
        const chatbotJson = await chatbotRes.json();
        setChatbotData(chatbotJson);

        // If chatbot has active chat sessions, fetch messages for the latest one
        const chatSessionId = chatbotJson.chatSessions?.[0]?.id;
        if (chatSessionId) {
          const messagesRes = await fetch(`/api/messages/${chatSessionId}`);
          const messagesJson = await messagesRes.json();
          setMessages(messagesJson);
        }
      } catch (err) {
        console.error("Error fetching chatbot or messages:", err);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleInformationSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const chatId = await startNewChat(name, email, id);
    console.log(chatId);
    setChatId(chatId);
    setLoading(false);
    setIsOpen(false);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { message: formMessage } = values;
    const message = formMessage;
    form.reset();
    if (!name || !email) {
      setIsOpen(true);
      setLoading(false);
    }
    if (!message.trim()) {
      return;
    }

    //Optimistically update the UI with the user's message
    const userMessage: Message = {
      id: Date.now(),
      content: message,
      created_at: new Date().toISOString(),
      chatSessionId: chatId,
      sender: "user",
    };

    //..And showing the Loading state for the AI Response
    const loadingMessage: Message = {
      id: Date.now() + 1,
      content: "Thinking...",
      created_at: new Date().toISOString(),
      chatSessionId: chatId,
      sender: "ai",
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      loadingMessage,
    ]);

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          chat_session_id: chatId,
          chatbot_id: id,
          content: message,
        }),
      });

      const result = await response.json();

      //Uploading the loading message for the AI with the ai response
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === loadingMessage.id
            ? { ...msg, content: result.content, id: result.id }
            : msg
        )
      );
    } catch (error) {
      console.log("Error sending message: ", error);
    }
  }
  return (
    <div className="w-full flex py-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleInformationSubmit}>
            <DialogHeader>
              <DialogTitle>Lets help you out!</DialogTitle>
              <DialogDescription>
                I Just need a few details to get started.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jhon@gmail.com"
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={!name || !email || loading}>
                {!loading ? "Continue" : "Loading..."}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col w-full max-w-3xl mx-auto bg-white md:rounded-t-lg shadow-2xl md:mt-10">
        <div className="pb-4 border-b sticky top-0 z-50 bg-[#4D7DF8] py-5 px-10 flex items-center space-x-4 rounded-t-lg">
          <Avatar
            seed={chatbotData?.name!}
            className="h-12 w-12 bg-white rounded-full border-2 border-white text-white"
          />
          <div>
            <h1 className="truncate text-lg">{chatbotData?.name}</h1>
            <p className="text-sm text-gray-300">
              ⚡️ Typically replies Instantly
            </p>
          </div>
        </div>
        <Messages messages={messages} chatbotName={chatbotData?.name!} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-start sticky bottom-0 z-50 space-x-4 drop-shadow-lg p-4 bg-gray-100 rounded-md w-full"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel hidden>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type a Message..."
                      {...field}
                      className="p-8"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              type="submit"
              className="h-full"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
export default ChatbotPage;

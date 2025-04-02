"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10 bg-white m-10 rounded-md w-full">
      <h1 className="text-4xl font-light">
        Welcome to <span className="text-[#64B5F5] font-semibold">Botnest</span>
      </h1>
      <h2 className="mt-2 mb-10">
        Your Customisable AI chat agent that helps you manage your customer{" "}
        conversations.
      </h2>
      <Link href="admin/create-chatbot">
        <Button className="!bg-[#64B5F5]">
          Let's get started by creating your first chatbot
        </Button>
      </Link>
    </main>
  );
}

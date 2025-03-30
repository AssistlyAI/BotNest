import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";

async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { userId } = await auth();
  console.log(userId);
  if (!userId) {
    return redirect("/guest/login");
  }
  return (
    <div className="h-screen flex flex-col flex-1">
      <Header />
      <div className="flex flex-col flex-1 lg:flex-row overflow-hidden bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex justify-center lg:justify-start items-start max-w-5xl mx-auto w-full p-5 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;

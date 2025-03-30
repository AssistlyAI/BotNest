import Avatar from "@/components/Avatar";
import Navbar from "@/components/Navbar";
import { SignIn } from "@clerk/nextjs";
import React from "react";

function page() {
  return (
    <div className="relative w-full min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-800/50">
      <div className="absolute inset-0 -z-10 bg-white bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:6rem_4rem]" />
      <Navbar />
      <div className="flex-1 flex flex-col justify-center items-center py-10 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col items-center justify-center space-y-5 text-white">
            <div className="rounded-full bg-white p-5">
              <Avatar seed="KARTHIK Support Agent" className="h-60 w-60" />
            </div>
            <div className="text-center">
              <h1 className="text-4xl">Assistly</h1>
              <h2 className="text-base font-light">
                Your Customisable AI Chat Agent
              </h2>
              <h3 className="my-5 font-bold">Sign in to get started</h3>
            </div>
          </div>
          <SignIn routing="hash" fallbackRedirectUrl="/admin" />
        </div>
      </div>
    </div>
  );
}

export default page;

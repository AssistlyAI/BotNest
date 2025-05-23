"use client";
import Link from "next/link";
import React from "react";
import { TypingEffect } from "./typing-effect";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { redirect } from "next/navigation";
//import { ModeToggle } from "./ModeToggle";
import Avatar from "./Avatar";

function Navbar() {
  return (
    <div className="sticky z-50 top-4 flex justify-between items-center w-full max-w-screen-xl mx-auto px-4 py-2 shadow-md border-2 dark:border-gray-700 rounded-xl bg-white/70 dark:bg-gray-800/70 blur-backdrop">
      <div className="flex gap-2 items-center">
        <Avatar seed="KARTHIK Support Agent" className="h-12 w-12" />
        <Link href="/" className=" font-bold text-2xl">
          BotNest
        </Link>
      </div>
      <div>
        <TypingEffect />
      </div>
      <SignedIn>
        <div className="flex items-center space-x-2">
          <Button asChild variant="link" className="md:flex hidden">
            <Link href="/upgrade">Pricing</Link>
          </Button>
          <ModeToggle />
          {/* <UpgradeButton /> */}
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <Button variant="secondary" onClick={() => redirect("/guest/login")}>
          SignIn
        </Button>
      </SignedOut>
    </div>
  );
}

export default Navbar;

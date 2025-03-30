"use client";
import Link from "next/link";
import Avatar from "./Avatar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

function Header() {
  return (
    <header className="bg-white shadow-sm text-gray-800 flex justify-between p-5">
      <Link href="/" className="flex items-center text-4xl font-thin">
        <Avatar
          seed="Virtual bot Support Agent"
          className="w-12 h-12 rounded-full "
        />

        <div className="space-y-1">
          <h1>Assistly</h1>
          <h2 className="text-sm">Your Customizable AI Chat Agent</h2>
        </div>
      </Link>

      <div className="flex items-center ">
        <Link
          href="/upgrade"
          className="bg-gradient-to-r from-blue-500 via-white-500 to-blue-100
                       text-white font-semibold px-5 py-2 rounded-full
                       hover:opacity-90 transition-all shadow-md cursor-pointer"
        >
          Pricing
        </Link>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="px-4 py-2 bg-black text-white rounded-lg">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;

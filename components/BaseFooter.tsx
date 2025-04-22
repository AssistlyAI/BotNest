import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";

export default function BaseFooter() {
  return (
    <div className="bg-gray-500 text-secondary-foreground w-full border-t border-border mt-10">
      <div
        className="md:flex justify-around max-w-7xl mx-auto px-8 py-24 
        flex-col md:flex-row 
        items-center md:items-start 
        space-y-8 md:space-y-0"
      >
        <div className="text-center md:text-left w-full md:w-auto">
          <div className="flex gap-3 items-center justify-center md:justify-start">
            <Avatar
              seed="KARTHIK Support Agent"
              className="w-12 h-12 text-blue-400 fill-blue-400"
            />
            <h1 className="font-bold text-2xl text-white">Botnest</h1>
          </div>
          <p className="mt-3 text-md text-white/80 text-center md:text-left">
            AI Chatbot for Your Business
          </p>
          <p className="mt-3 text-sm text-center md:text-left">
            Copyright © 2025 - All rights reserved
          </p>
        </div>

        <div className="w-full md:w-auto text-center md:text-left">
          <h2 className="font-semibold mb-3 text-black/90">LINKS</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-white/70 hover:text-white transition-colors"
              >
                Github
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-white/70 hover:text-white transition-colors"
              >
                X.com
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-white/70 hover:text-white transition-colors"
              >
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-auto text-center md:text-left">
          <h2 className="font-semibold mb-3  text-black/90">LEGAL</h2>
          <ul className="space-y-2">
            <li className="text-white/70 hover:text-white transition-colors cursor-pointer">
              Terms of services
            </li>
            <li className="text-white/70 hover:text-white transition-colors cursor-pointer">
              Privacy policy
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

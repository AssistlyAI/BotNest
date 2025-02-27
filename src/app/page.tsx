"use client";
import Image from "next/image";
import "./globals.css";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-black bg-gradient-to-b from-white to-gray-50 flex flex-col items-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:6rem_4rem]" />

      <nav className="flex flex-wrap justify-between items-center w-full max-w-screen-xl mx-auto p-6">
        <h1 className="text-2xl font-bold sm:text-xl">Assistly - AI Chatbot</h1>

        <div className="flex items-center space-x-4">
          <div className="relative sm:hidden">
            <button
              className="text-black bg-white border rounded p-2"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

            {isMenuOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
                <li>Features</li>
                <li>Use Cases</li>
                <li>Pricing</li>
                <li>Contact Us</li>
              </ul>
            )}
          </div>

          <ul className="hidden sm:flex space-x-4">
            <li>Features</li>
            <li>Use Cases</li>
            <li>Pricing</li>
            <li>Contact Us</li>
          </ul>

          <UserButton showName />
        </div>
      </nav>

      <section className="flex flex-col items-center text-center mt-16 px-6 max-w-screen-xl">
        <h2 className="text-5xl font-extrabold bg-black text-transparent bg-clip-text sm:text-3xl md:text-4xl">
          AI Chatbot for Your Business
        </h2>
        <p className="mt-4 text-black max-w-2xl sm:text-sm md:text-lg">
          Deploy a customizable AI chatbot for customer service. Train it in
          real time and integrate it seamlessly into your business website.
        </p>

        <div className="mt-6 flex space-x-4">
          <SignedIn>
            <button
              className="px-6 py-2 bg-black text-white rounded-lg sm:px-4 sm:py-2"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="redirect">
              <button className="px-6 py-2 bg-black text-white rounded-lg sm:px-4 sm:py-2">
                Sign Up
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 px-6 text-center max-w-screen-xl w-full">
        <h3 className="text-3xl font-semibold mb-8 sm:text-2xl">
          Why Choose Us?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          <div className="p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold sm:text-lg">Instant Support</h4>
            <p className="mt-2 text-gray-600 sm:text-sm">
              Get immediate assistance with our AI-powered chatbot, available
              anytime.
            </p>
          </div>

          <div className="p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold sm:text-lg">
              Customizable Responses
            </h4>
            <p className="mt-2 text-gray-600 sm:text-sm">
              Tailor responses to fit your business needs and tone.
            </p>
          </div>

          <div className="p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold sm:text-lg">
              Seamless Integration
            </h4>
            <p className="mt-2 text-gray-600 sm:text-sm">
              Easily integrate the chatbot with your website and other tools.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/Avatar";
import { CyclingTypingEffect } from "@/components/typing";
import Navbar from "@/components/Navbar";
import { BlocksIcon, HandHelpingIcon, WrenchIcon } from "lucide-react";
import AssistlyWorkflowFlowchart from "@/components/DocumentationSection";
import BaseFooter from "@/components/BaseFooter";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <div className="flex-1">
      <div className="relative w-full min-h-screen bg-gradient-to-b from-white to-gray-50/50">
        <div className="absolute inset-0 -z-10  h-full  w-full bg-white bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:6rem_4rem]" />
        <Navbar />
        <div className="overflow-y-scroll h-full">
          <section className="relative z-10 flex flex-col items-center text-center mt-16 px-6 max-w-screen-xl mx-auto">
            <Avatar seed="KARTHIK Support Agent" className="h-40 w-40" />
            <h2 className="text-5xl font-extrabold sm:text-3xl md:text-4xl flex flex-wrap items-center">
              AI Chatbot for Your
              <CyclingTypingEffect />
            </h2>
            <p className="mt-4 text-black max-w-2xl sm:text-sm md:text-lg">
              Deploy a customizable AI chatbot for customer service. Train it in
              real time and integrate it seamlessly into your business website.
            </p>
            <div className="mt-10">
              <Button asChild>
                <Link href="/admin">Try Now</Link>
              </Button>
            </div>
          </section>

          <section className="relative z-10 mt-10 px-6 text-center w-full max-w-screen-xl mx-auto">
            <h3 className="text-3xl font-semibold mb-8 sm:text-2xl">
              Why Choose Us?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
              <div className="p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 justify-center">
                  <HandHelpingIcon />
                  <h4 className="text-xl font-bold sm:text-lg">
                    Instant Support
                  </h4>
                </div>
                <p className="mt-2 text-gray-600 sm:text-sm">
                  Get immediate assistance with our AI-powered chatbot,
                  available anytime.
                </p>
              </div>

              <div className="p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 justify-center">
                  <WrenchIcon />
                  <h4 className="text-xl font-bold sm:text-lg">
                    Customizable Responses
                  </h4>
                </div>

                <p className="mt-2 text-gray-600 sm:text-sm">
                  Tailor responses to fit your business needs and tone.
                </p>
              </div>

              <div className="p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 justify-center">
                  <BlocksIcon />
                  <h4 className="text-xl font-bold sm:text-lg">
                    Seamless Integration
                  </h4>
                </div>
                <p className="mt-2 text-gray-600 sm:text-sm">
                  Easily integrate the chatbot with your website and other
                  tools.
                </p>
              </div>
            </div>
          </section>
          <AssistlyWorkflowFlowchart />
          <Reviews />
          <section className="relative z-10 mt-10 px-6 py-6 text-center w-full max-w-screen-xl mx-auto bg-gradient-to-r from-blue-50 to-white border border-gray-200 rounded-lg shadow-lg">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-2">
                Frequently Asked Questions
              </h1>
              <p className="text-gray-600">
                Frequently asked questions about our product
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Botnest?</AccordionTrigger>
                <AccordionContent>
                Botnest is a platform that helps businesses create their own AI-powered chatbot easily—without needing to code.
                Just give your bot a name and some basic info about your business, and it’s ready to chat with your customers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do I need to know how to code to use Botnest?</AccordionTrigger>
                <AccordionContent>
                No coding skills are needed! Botnest is a no-code platform, 
                so anyone can set up and manage their chatbot using our simple interface.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I create a chatbot with Botnest?</AccordionTrigger>
                <AccordionContent>
                Just follow these steps:
                  Give your bot a title.
                  Provide information about your business.
                  Customize the bot’s personality and appearance.
                  Get a link to add the chatbot to your website.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I use Botnest on my own website?</AccordionTrigger>
                <AccordionContent>
                Yes! Once your chatbot is ready, you’ll get a unique URL or embed code that you can easily add to your website.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>What kind of businesses can use Botnest?</AccordionTrigger>
                <AccordionContent>
                Any business—big or small—can use Botnest. Whether you’re in retail, healthcare, education, or any other industry, 
                our templates and customization options make it easy to fit your needs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>Can I customize how my bot talks and looks?</AccordionTrigger>
                <AccordionContent>
                Yes, you can fully customize the chatbot’s tone, style, and appearance to match your brand.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>How do I monitor how my chatbot is performing?</AccordionTrigger>
                <AccordionContent>
                Botnest gives you real-time monitoring tools, session tracking, and performance insights, 
                so you can see how your bot is doing and improve it over time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger>Will the chatbot get smarter over time?</AccordionTrigger>
                <AccordionContent>
                Yes! Botnest includes learning features so your chatbot can improve based on conversations and user behavior.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-9">
                <AccordionTrigger>Is it easy to integrate Botnest with other tools or platforms?</AccordionTrigger>
                <AccordionContent>
                Absolutely. Botnest offers quick API integration options so you can connect your chatbot with your existing systems.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-10">
                <AccordionTrigger>Can I see what users are saying to the chatbot?</AccordionTrigger>
                <AccordionContent>
                Yes, you can view full conversation logs, track user interactions, and get detailed analytics to understand engagement and improve the bot’s responses.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          <BaseFooter />
        </div>
      </div>
    </div>
  );
}

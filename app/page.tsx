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
        <Navbar />
        <div className="absolute inset-0 -z-10  h-full  w-full bg-white bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:6rem_4rem]" />
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
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
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

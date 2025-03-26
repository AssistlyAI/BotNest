"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  BotMessageSquareIcon,
  BookCheckIcon,
  BarChartIcon,
} from "lucide-react";
import Image1 from "../public/Assistly3.png";
import Image2 from "../public/Assistly2.png";
import Image3 from "../public/Assistly1.png";

const workflowSteps = [
  {
    title: "Create Chatbot",
    icon: BotMessageSquareIcon,
    image: Image1,
    description:
      "Set up AI chatbot with intuitive interface and brand customization.",
    features: [
      "Industry templates",
      "Custom bot personality",
      "Easy configuration",
      "Quick integration",
    ],
  },
  {
    title: "Manage Chatbots",
    icon: BookCheckIcon,
    image: Image2,
    description:
      "Monitor performance and track chatbot characteristics in real-time.",
    features: [
      "Real-time monitoring",
      "Session tracking",
      "Characteristics overview",
      "Easy management",
    ],
  },
  {
    title: "Analyze Sessions",
    icon: BarChartIcon,
    image: Image3,
    description: "Gain insights into chatbot interactions and user engagement.",
    features: [
      "Session analytics",
      "Interaction tracking",
      "Performance insights",
      "Conversation logs",
    ],
  },
];

export default function AssistlyWorkflowFlowchart() {
  return (
    <section className="max-w-screen-xl mx-auto py-16 px-6 bg-gradient-to-b from-blue-50 to-white rounded-lg mt-6">
      <h2 className="text-4xl font-extrabold text-center mb-12">
        Assistly Workflow
      </h2>
      <div className="space-y-16">
        {workflowSteps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              i % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <Image
              src={step.image}
              alt={step.title}
              width={600}
              height={400}
              className="rounded-xl shadow-xl object-cover w-full md:w-1/2"
            />
            <div className="md:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                <step.icon className="h-8 w-8 text-blue-600" />
                <h3 className="text-3xl font-semibold">{step.title}</h3>
              </div>
              <p className="text-gray-700 mb-6">{step.description}</p>
              <ul className="space-y-3">
                {step.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { BrainCircuitIcon, PlusIcon, RocketIcon } from "lucide-react";

export function TypingEffect() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  // Define the content with colors and animations
  const content = [
    {
      icon: <PlusIcon className="text-emerald-500" size={28} />,
      text: "Create",
      color: "from-emerald-500 to-green-400",
    },
    {
      icon: <BrainCircuitIcon className="text-blue-500" size={28} />,
      text: "Train",
      color: "from-blue-500 to-indigo-400",
    },
    {
      icon: <RocketIcon className="text-purple-500" size={28} />,
      text: "Deploy",
      color: "from-purple-500 to-pink-400",
    },
  ];

  const animationItems = content.flatMap((item, idx) => [
    { type: "icon", content: item.icon, color: item.color, key: `icon-${idx}` },
    { type: "text", content: item.text, color: item.color, key: `text-${idx}` },
  ]);

  return (
    <div className="w-full flex justify-center my-4">
      <h2
        ref={ref}
        className="text-center text-xl font-bold md:leading-[4rem]  items-center gap-2 bg-white dark:bg-gray-800 px-2 py-2 rounded-full shadow-lg hidden md:inline-flex"
      >
        <AnimatePresence>
          {isInView &&
            animationItems.map((item, index) => (
              <motion.span
                key={item.key}
                className={`inline-flex items-center ${
                  item.type === "text"
                    ? "bg-gradient-to-r " +
                      item.color +
                      " bg-clip-text text-transparent"
                    : ""
                }`}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.4,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 200,
                  },
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
              >
                {item.type === "icon" && (
                  <motion.div
                    className="mx-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-full"
                    whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                  >
                    {item.content}
                  </motion.div>
                )}
                {item.type === "text" && (
                  <span className="mx-1">{item.content}</span>
                )}
              </motion.span>
            ))}
        </AnimatePresence>
      </h2>
    </div>
  );
}

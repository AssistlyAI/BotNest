"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function CyclingTypingEffect() {
  const words = ["Business", "Company"];
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [displayedLetters, setDisplayedLetters] = React.useState<string[]>([]);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing state
          if (displayedLetters.length < currentWord.length) {
            setDisplayedLetters((prevLetters) => [
              ...prevLetters,
              currentWord[prevLetters.length],
            ]);
          } else {
            // Complete word is displayed, pause before starting deletion
            setIsPaused(true);
            setTimeout(() => {
              setIsPaused(false);
              setIsDeleting(true);
            }, 1500); // Pause at complete word
          }
        } else {
          // Deleting state
          if (displayedLetters.length > 0) {
            setDisplayedLetters((prevLetters) =>
              prevLetters.slice(0, prevLetters.length - 1)
            );
          } else {
            // Word is completely deleted, move to next word
            setIsDeleting(false);
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          }
        }
      },
      isDeleting ? 80 : isPaused ? 1500 : 150
    ); // Different speeds for typing/deleting

    return () => clearTimeout(timeout);
  }, [displayedLetters, isDeleting, isPaused, currentWordIndex, words]);

  return (
    <span className="inline-flex items-center justify-center w-full sm:w-auto ml-0 sm:ml-2 relative min-w-20 sm:min-w-16 md:min-w-20 mt-2 sm:mt-0">
      <div className="flex justify-center sm:justify-start">
        {displayedLetters.map((letter, index) => (
          <motion.span
            key={`${index}-${letter}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
            }}
            className="text-blue-600"
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="h-8 w-1 bg-blue-500 ml-1"
      />
    </span>
  );
}

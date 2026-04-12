"use client";

import { motion } from "framer-motion";
import type { QuizQuestion as QuizQuestionType } from "@/types/quiz";

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedValue: number | null;
  onAnswer: (answer: { label: string; value: number }) => void;
}

export default function QuizQuestion({
  question,
  selectedValue,
  onAnswer,
}: QuizQuestionProps) {
  return (
    <div className="w-full">
      <div className="text-center">
        <h2 className="text-display-md font-semibold text-ink">
          {question.question}
        </h2>
        {question.subtext && (
          <p className="mt-3 text-ink-muted">{question.subtext}</p>
        )}
      </div>

      <div className="mt-10 flex flex-col gap-3">
        {question.options.map((option, i) => {
          const isSelected = selectedValue === option.value;
          return (
            <motion.button
              key={option.label}
              type="button"
              onClick={() => onAnswer({ label: option.label, value: option.value })}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileTap={{ scale: 0.99 }}
              className={`group flex items-center gap-4 rounded-2xl border bg-white px-5 py-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-ink shadow-lift"
                  : "border-line hover:border-ink/60 hover:shadow-soft"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected
                    ? "border-ink bg-ink"
                    : "border-line bg-cream group-hover:border-ink/60"
                }`}
                aria-hidden="true"
              >
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="h-2 w-2 rounded-full bg-cream"
                  />
                )}
              </span>
              <span className="flex-1 text-[15px] font-medium text-ink md:text-base">
                {option.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

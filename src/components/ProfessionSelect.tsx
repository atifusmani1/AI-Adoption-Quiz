"use client";

import { motion } from "framer-motion";
import { PROFESSIONS } from "@/lib/questions";

interface ProfessionSelectProps {
  selected: string;
  onSelect: (profession: string) => void;
}

export default function ProfessionSelect({
  selected,
  onSelect,
}: ProfessionSelectProps) {
  return (
    <div className="w-full">
      <div className="text-center">
        <h2 className="text-display-md font-semibold text-ink">
          First, tell us about your field
        </h2>
        <p className="mt-3 text-ink-muted">
          This is how we compare your AI usage against industry benchmarks.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
        {PROFESSIONS.map((p, i) => {
          const isSelected = selected === p.label;
          return (
            <motion.button
              key={p.label}
              type="button"
              onClick={() => onSelect(p.label)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: i * 0.03,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileTap={{ scale: 0.98 }}
              className={`group flex items-center gap-3 rounded-2xl border bg-white px-4 py-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-ink shadow-lift"
                  : "border-line hover:border-ink/60 hover:shadow-soft"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm transition-colors ${
                  isSelected
                    ? "border-ink bg-ink text-cream"
                    : "border-line bg-cream text-ink group-hover:border-ink/60"
                }`}
                aria-hidden="true"
              >
                {p.icon}
              </span>
              <span className="text-sm font-medium text-ink md:text-[15px]">
                {p.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

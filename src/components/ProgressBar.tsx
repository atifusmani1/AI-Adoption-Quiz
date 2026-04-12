"use client";

import { motion } from "framer-motion";
import { TOTAL_QUESTIONS } from "@/types/quiz";

interface ProgressBarProps {
  step: number;
}

export default function ProgressBar({ step }: ProgressBarProps) {
  const totalBuckets = TOTAL_QUESTIONS + 1;
  const clamped = Math.max(0, Math.min(step, totalBuckets));
  const pct = (clamped / totalBuckets) * 100;

  const label =
    step === 0
      ? "Your field"
      : step >= 1 && step <= TOTAL_QUESTIONS
      ? `Question ${step} of ${TOTAL_QUESTIONS}`
      : "Almost done";

  return (
    <div className="w-full">
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={totalBuckets}
        aria-label={label}
        className="relative h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated"
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-accent"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="mt-3 text-xs font-medium text-fg-faint">
        {label}
      </div>
    </div>
  );
}

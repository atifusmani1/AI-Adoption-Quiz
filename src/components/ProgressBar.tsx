"use client";

import { motion } from "framer-motion";
import { TOTAL_QUESTIONS } from "@/types/quiz";

interface ProgressBarProps {
  /** Current quiz step (0 = profession, 1–10 = questions, 11 = email). */
  step: number;
}

export default function ProgressBar({ step }: ProgressBarProps) {
  // Map step → progress fraction. Profession select counts as step 0 / 11.
  // 11 buckets: profession + 10 questions. Email = 100%.
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
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-line">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-ink"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.18em] text-ink-muted">
        {label}
      </div>
    </div>
  );
}

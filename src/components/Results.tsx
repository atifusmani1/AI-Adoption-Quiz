"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { QuizDimension, QuizResult } from "@/types/quiz";
import { getBenchmark } from "@/lib/benchmarks";
import { DIMENSION_LABELS, DIMENSION_INSIGHTS } from "@/lib/scoring";
import { getRecommendations, type ToolRecommendation } from "@/lib/recommendations";

interface ResultsProps {
  result: QuizResult;
  profession: string;
  onContinue: () => void;
}

export default function Results({
  result,
  profession,
  onContinue,
}: ResultsProps) {
  const benchmark = getBenchmark(profession);
  const tools = getRecommendations(profession, result.percentage);

  return (
    <div className="w-full pb-16">
      {/* Score header */}
      <ScoreHeader result={result} />

      {/* Percentile — the hero feature */}
      <PercentileSection
        percentile={result.percentile}
        audienceLabel={benchmark.audienceLabel}
      />

      {/* Persona */}
      <PersonaSection
        persona={result.persona}
        description={result.personaDescription}
      />

      {/* Dimension breakdown */}
      <DimensionBreakdown dimensions={result.dimensionScores} />

      {/* Tool recommendations */}
      <ToolSection tools={tools} profession={profession} />

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="mt-16 text-center"
      >
        <button
          type="button"
          onClick={onContinue}
          className="btn-primary"
        >
          Unlock Full Report
          <span aria-hidden="true">→</span>
        </button>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated score counter                                            */
/* ------------------------------------------------------------------ */

function ScoreHeader({ result }: { result: QuizResult }) {
  const [displayScore, setDisplayScore] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * result.totalScore));
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [result.totalScore]);

  const pct = result.percentage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      <span className="text-xs uppercase tracking-[0.2em] text-ink-muted">
        Your AI Adoption Score
      </span>

      {/* Circular gauge */}
      <div className="relative mx-auto mt-8 h-44 w-44">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#E7E3D8"
            strokeWidth="6"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#0A0A0A"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 52}
            initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
            animate={{
              strokeDashoffset: 2 * Math.PI * 52 * (1 - pct / 100),
            }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-semibold tabular-nums text-ink">
            {displayScore}
          </span>
          <span className="text-sm text-ink-muted">/ {result.maxScore}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Percentile — the star feature                                     */
/* ------------------------------------------------------------------ */

function PercentileSection({
  percentile,
  audienceLabel,
}: {
  percentile: number;
  audienceLabel: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="mt-14 rounded-3xl border border-line bg-white px-8 py-10 text-center shadow-soft"
    >
      <p className="text-display-md font-semibold text-ink md:text-display-lg">
        You rank higher than{" "}
        <span className="relative inline-block">
          <span className="tabular-nums">{percentile}%</span>
          <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-ink/80" />
        </span>{" "}
        of {audienceLabel}
      </p>
      <p className="mt-3 text-sm text-ink-muted">
        in AI adoption, based on industry survey data.
      </p>

      {/* Distribution bar */}
      <div className="mx-auto mt-8 max-w-md">
        <div className="relative h-4 overflow-hidden rounded-full bg-cream-dark">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-ink"
            initial={{ width: "0%" }}
            animate={inView ? { width: `${percentile}%` } : {}}
            transition={{
              duration: 1.2,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-ink-faint">
          <span>0th</span>
          <span>50th</span>
          <span>99th</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Persona badge                                                     */
/* ------------------------------------------------------------------ */

function PersonaSection({
  persona,
  description,
}: {
  persona: string;
  description: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const emoji: Record<string, string> = {
    "AI Vanguard": "⚡",
    "Power User": "◆",
    "Active Adopter": "▲",
    "Curious Explorer": "◎",
    "AI Newcomer": "○",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="mt-8 rounded-3xl border border-line bg-white px-8 py-8 shadow-soft"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-cream text-xl">
          {emoji[persona] ?? "●"}
        </span>
        <h3 className="text-xl font-semibold text-ink">{persona}</h3>
      </div>
      <p className="mt-4 leading-relaxed text-ink-muted">{description}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dimension breakdown bars                                          */
/* ------------------------------------------------------------------ */

function DimensionBreakdown({
  dimensions,
}: {
  dimensions: Record<QuizDimension, number>;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const order: QuizDimension[] = [
    "frequency",
    "breadth",
    "depth",
    "investment",
    "integration",
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="mt-8 rounded-3xl border border-line bg-white px-8 py-8 shadow-soft"
    >
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
        Dimension Breakdown
      </h3>

      <div className="space-y-5">
        {order.map((dim, i) => {
          const score = dimensions[dim];
          return (
            <div key={dim}>
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="text-sm font-medium text-ink">
                  {DIMENSION_LABELS[dim]}
                </span>
                <span className="text-xs tabular-nums text-ink-muted">
                  {score}%
                </span>
              </div>
              <div className="relative h-2.5 overflow-hidden rounded-full bg-cream-dark">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-ink"
                  initial={{ width: "0%" }}
                  animate={inView ? { width: `${score}%` } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>
              <p className="mt-1 text-xs text-ink-faint">
                {DIMENSION_INSIGHTS[dim](score)}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tool recommendations (free tier — 2–3 shown)                      */
/* ------------------------------------------------------------------ */

function ToolSection({
  tools,
  profession,
}: {
  tools: ToolRecommendation[];
  profession: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const visible = tools.slice(0, 3);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="mt-8"
    >
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
        Recommended Tools for You
      </h3>

      <div className="space-y-3">
        {visible.map((tool, i) => (
          <motion.a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.4 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group flex items-start gap-4 rounded-2xl border border-line bg-white px-6 py-5 shadow-soft transition-all duration-200 hover:border-ink/40 hover:shadow-lift"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-cream text-sm font-semibold text-ink-muted">
              {tool.name.charAt(0)}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold text-ink">
                  {tool.name}
                </span>
                <span className="text-xs text-ink-faint transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </div>
              <p className="mt-0.5 text-sm text-ink-muted">
                {tool.description}
              </p>
              <p className="mt-1 text-xs text-ink-faint">{tool.why}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

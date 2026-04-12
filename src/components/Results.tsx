"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import type { QuizDimension, QuizResult } from "@/types/quiz";
import { getBenchmark } from "@/lib/benchmarks";
import { DIMENSION_LABELS, DIMENSION_INSIGHTS } from "@/lib/scoring";
import { getRecommendations, type ToolRecommendation } from "@/lib/recommendations";
import { getBrandClass, getToolLogo } from "@/lib/toolLogos";

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
      <ScoreHeader result={result} />
      <PercentileSection
        percentile={result.percentile}
        audienceLabel={benchmark.audienceLabel}
      />
      <PersonaSection
        persona={result.persona}
        description={result.personaDescription}
      />
      <DimensionBreakdown dimensions={result.dimensionScores} />
      <ToolSection tools={tools} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="mt-16 text-center"
      >
        <button type="button" onClick={onContinue} className="btn-primary">
          Unlock Full Report
          <span aria-hidden="true">&rarr;</span>
        </button>
      </motion.div>
    </div>
  );
}

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
      <span className="badge-pill">Your AI Adoption Score</span>
      <div className="relative mx-auto mt-8 h-44 w-44">
        <svg
          viewBox="0 0 120 120"
          className="h-full w-full -rotate-90"
          role="img"
          aria-label={`Score: ${result.totalScore} out of ${result.maxScore}`}
        >
          <circle cx="60" cy="60" r="52" fill="none" stroke="#F0F2F5" strokeWidth="6" />
          <motion.circle
            cx="60" cy="60" r="52"
            fill="none" stroke="#22C55E" strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 52}
            initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - pct / 100) }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold tabular-nums text-fg">{displayScore}</span>
          <span className="text-sm text-fg-muted">/ {result.maxScore}</span>
        </div>
      </div>
    </motion.div>
  );
}

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
      className="light-card mt-14 px-5 py-8 text-center md:px-8 md:py-10"
    >
      <p className="text-display-md md:text-display-lg">
        You rank higher than{" "}
        <span className="text-accent tabular-nums">{percentile}%</span>{" "}
        of {audienceLabel}
      </p>
      <p className="mt-3 text-sm text-fg-muted">
        in AI adoption, based on industry survey data.
      </p>
      <div className="mx-auto mt-8 max-w-md">
        <div className="relative h-3 overflow-hidden rounded-full bg-bg-elevated">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-accent"
            initial={{ width: "0%" }}
            animate={inView ? { width: `${percentile}%` } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-fg-faint">
          <span>0th</span><span>50th</span><span>99th</span>
        </div>
      </div>
    </motion.div>
  );
}

function PersonaSection({ persona, description }: { persona: string; description: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="light-card mt-5 px-5 py-6 md:px-8 md:py-8"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light text-lg text-accent font-bold">
          {persona.charAt(0)}
        </span>
        <h3 className="text-xl font-bold">{persona}</h3>
      </div>
      <p className="mt-4 leading-relaxed text-fg-muted">{description}</p>
    </motion.div>
  );
}

function DimensionBreakdown({ dimensions }: { dimensions: Record<QuizDimension, number> }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const order: QuizDimension[] = ["frequency", "breadth", "depth", "investment", "integration"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="light-card mt-5 px-5 py-6 md:px-8 md:py-8"
    >
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-fg-faint">
        Dimension Breakdown
      </h3>
      <div className="space-y-5">
        {order.map((dim, i) => {
          const score = dimensions[dim];
          return (
            <div key={dim}>
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="text-sm font-medium">{DIMENSION_LABELS[dim]}</span>
                <span className="text-xs tabular-nums text-fg-muted">{score}%</span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-bg-elevated">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-accent"
                  initial={{ width: "0%" }}
                  animate={inView ? { width: `${score}%` } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <p className="mt-1 text-xs text-fg-faint">{DIMENSION_INSIGHTS[dim](score)}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function ToolIcon({ name }: { name: string }) {
  const logo = getToolLogo(name);
  const brandClass = getBrandClass(name);

  if (logo) {
    return (
      <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl overflow-hidden ${brandClass}`}>
        <Image src={logo} alt={name} width={28} height={28} className="object-contain" />
      </span>
    );
  }

  return (
    <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-fg-muted ${brandClass}`}>
      {name.charAt(0)}
    </span>
  );
}

function ToolSection({ tools }: { tools: ToolRecommendation[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const visible = tools.slice(0, 3);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="mt-5"
    >
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-fg-faint">
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
            transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="light-card group flex items-start gap-3 px-4 py-4 md:gap-4 md:px-6 md:py-5"
          >
            <ToolIcon name={tool.name} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold">{tool.name}</span>
                <span className="text-xs text-accent transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </div>
              <p className="mt-0.5 text-sm text-fg-muted">{tool.description}</p>
              <p className="mt-1 text-xs text-fg-faint">{tool.why}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

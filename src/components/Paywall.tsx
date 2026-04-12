"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { UserState, QuizResult } from "@/types/quiz";
import { getRecommendations } from "@/lib/recommendations";

interface PaywallProps {
  userState: UserState;
}

function buildPayload(userState: UserState) {
  const result = userState.result!;
  const toolNames = getRecommendations(
    userState.profession,
    result.percentage
  ).map((t) => t.name);

  return {
    email: userState.email,
    profession: userState.profession,
    topic: "AI Adoption & Usage Assessment",
    responses: userState.responses.map((r) => ({
      questionId: r.questionId,
      answer: r.answer,
      value: r.value,
    })),
    result: {
      totalScore: result.totalScore,
      maxScore: result.maxScore,
      percentage: result.percentage,
      percentile: result.percentile,
      persona: result.persona,
      dimensionScores: result.dimensionScores,
    },
    recommendations: toolNames,
    metadata: {
      startedAt: userState.startedAt,
      completedAt: new Date().toISOString(),
      userAgent:
        typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
      quizVersion: "1.0",
    },
    timestamp: new Date().toISOString(),
  };
}

const CHECK = (
  <svg
    className="h-4 w-4 shrink-0 text-ink"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3.5 8.5L6.5 11.5L12.5 4.5" />
  </svg>
);

const perks = [
  "Detailed analysis across all 5 dimensions",
  "Personalized learning path for your field",
  "Extended tool recommendations with tutorials",
  "Industry trend insights for your profession",
  "Monthly AI adoption benchmark updates",
];

export default function Paywall({ userState }: PaywallProps) {
  const hasFired = useRef(false);
  const [postStatus, setPostStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [toast, setToast] = useState<string | null>(null);
  const payloadRef = useRef<ReturnType<typeof buildPayload> | null>(null);

  // Fire POST exactly once on mount
  useEffect(() => {
    if (hasFired.current || !userState.result) return;
    hasFired.current = true;

    const payload = buildPayload(userState);
    payloadRef.current = payload;
    setPostStatus("sending");

    fetch("https://eok6jwfc02gp9rc.m.pipedream.net/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          setPostStatus("sent");
          console.log("[AdaptAI] Submission POST succeeded");
        } else {
          setPostStatus("error");
          console.error("[AdaptAI] Submission POST failed:", res.status);
        }
      })
      .catch((err) => {
        setPostStatus("error");
        console.error("[AdaptAI] Submission POST error:", err);
      });
  }, [userState]);

  const handleDownloadJSON = useCallback(() => {
    const payload = payloadRef.current ?? buildPayload(userState);
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "submission.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [userState]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handlePurchase = useCallback(
    (tier: string) => {
      showToast(`Thanks! This is a demo — no payment required. (${tier})`);
    },
    [showToast]
  );

  return (
    <div className="w-full pb-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-ink-muted">
          Full Report
        </span>
        <h2 className="mt-3 text-display-md font-semibold text-ink">
          Unlock Your Full AI Edge Report
        </h2>
      </motion.div>

      {/* Perks */}
      <motion.ul
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-10 max-w-sm space-y-3"
      >
        {perks.map((perk) => (
          <li key={perk} className="flex items-start gap-3 text-[15px] text-ink">
            {CHECK}
            <span>{perk}</span>
          </li>
        ))}
      </motion.ul>

      {/* Pricing cards */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 grid gap-4 md:grid-cols-2"
      >
        {/* Basic */}
        <div className="rounded-3xl border border-line bg-white px-6 py-8 shadow-soft">
          <h3 className="text-lg font-semibold text-ink">Basic Report</h3>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-semibold tabular-nums text-ink">
              $9.99
            </span>
            <span className="text-sm text-ink-muted">one-time</span>
          </div>
          <button
            type="button"
            onClick={() => handlePurchase("Basic Report")}
            className="btn-secondary mt-6 w-full justify-center text-center"
          >
            Get Full Report
          </button>
        </div>

        {/* Pro */}
        <div className="relative rounded-3xl border border-ink bg-white px-6 py-8 shadow-lift">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cream">
            Most Popular
          </span>
          <h3 className="text-lg font-semibold text-ink">Pro Bundle</h3>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-semibold tabular-nums text-ink">
              $19.99
            </span>
            <span className="text-sm text-ink-muted">one-time</span>
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            Full report + course access
          </p>
          <button
            type="button"
            onClick={() => handlePurchase("Pro Bundle")}
            className="btn-primary mt-6 w-full justify-center text-center"
          >
            Get Report + Course Access
          </button>
        </div>
      </motion.div>

      {/* Guarantee */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 text-center text-xs text-ink-faint"
      >
        30-day money-back guarantee
      </motion.p>

      {/* Footer row: POST status + download */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 flex flex-col items-center gap-3"
      >
        {postStatus === "sent" && (
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-faint">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.5 8.5L6.5 11.5L12.5 4.5" />
            </svg>
            Submission recorded
          </span>
        )}

        <button
          type="button"
          onClick={handleDownloadJSON}
          className="text-xs text-ink-faint underline underline-offset-2 transition-colors hover:text-ink-muted"
        >
          Download submission.json
        </button>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-2xl border border-line bg-white px-6 py-4 text-sm text-ink shadow-lift"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

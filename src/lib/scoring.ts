import type {
  QuizDimension,
  QuizResponse,
  QuizResult,
} from "@/types/quiz";
import { MAX_SCORE, QUESTIONS } from "@/lib/questions";
import { getBenchmark } from "@/lib/benchmarks";

/**
 * Abramowitz & Stegun 7.1.26 approximation of the error function.
 * Max error ~1.5e-7 — more than accurate enough for a 1–99 percentile.
 */
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1 / (1 + p * absX);
  const y =
    1 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);

  return sign * y;
}

/** Standard normal cumulative distribution function. */
function normalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

/**
 * Given a user's score and their profession's distribution, return the
 * percentile (1–99) — i.e. the share of people in that profession the user
 * scores higher than.
 */
export function calculatePercentile(
  score: number,
  mean: number,
  stdDev: number
): number {
  if (stdDev <= 0) return 50;
  const z = (score - mean) / stdDev;
  const raw = normalCDF(z) * 100;
  return Math.max(1, Math.min(99, Math.round(raw)));
}

export interface Persona {
  persona: string;
  description: string;
}

export function getPersona(percentage: number): Persona {
  if (percentage >= 85) {
    return {
      persona: "AI Vanguard",
      description:
        "You're on the bleeding edge. AI isn't a tool you reach for — it's woven into how you think and ship work. You're likely building workflows, agents, and automations that most people haven't even considered yet.",
    };
  }
  if (percentage >= 70) {
    return {
      persona: "Power User",
      description:
        "AI is deeply embedded in your daily process. You juggle multiple tools fluently, pay for the ones that matter, and reach for advanced features while most of your peers are still typing basic prompts.",
    };
  }
  if (percentage >= 50) {
    return {
      persona: "Active Adopter",
      description:
        "You're ahead of the curve. You use AI regularly, you've found tools that work for you, and you're comfortable experimenting. The next step is deepening how AI handles complex, multi-step work for you.",
    };
  }
  if (percentage >= 30) {
    return {
      persona: "Curious Explorer",
      description:
        "You've dipped your toes in and you know the basics. You're seeing the potential but haven't yet made AI a consistent habit. With the right tools for your field, you can close the gap fast.",
    };
  }
  return {
    persona: "AI Newcomer",
    description:
      "You're just getting started — and that's a real opportunity. The learning curve is shorter than you think, and even lightweight daily use pays off quickly. The right first tool can unlock hours every week.",
  };
}

export function scoreDimensions(
  responses: QuizResponse[]
): Record<QuizDimension, number> {
  const byDim: Record<QuizDimension, { sum: number; max: number }> = {
    frequency: { sum: 0, max: 0 },
    breadth: { sum: 0, max: 0 },
    depth: { sum: 0, max: 0 },
    investment: { sum: 0, max: 0 },
    integration: { sum: 0, max: 0 },
  };

  for (const q of QUESTIONS) {
    byDim[q.dimension].max += 4;
    const response = responses.find((r) => r.questionId === q.id);
    if (response) {
      byDim[q.dimension].sum += response.value;
    }
  }

  return {
    frequency: Math.round((byDim.frequency.sum / byDim.frequency.max) * 100),
    breadth: Math.round((byDim.breadth.sum / byDim.breadth.max) * 100),
    depth: Math.round((byDim.depth.sum / byDim.depth.max) * 100),
    investment: Math.round((byDim.investment.sum / byDim.investment.max) * 100),
    integration: Math.round(
      (byDim.integration.sum / byDim.integration.max) * 100
    ),
  };
}

export function computeQuizResult(
  responses: QuizResponse[],
  profession: string
): QuizResult {
  const totalScore = responses.reduce((sum, r) => sum + r.value, 0);
  const percentage = Math.round((totalScore / MAX_SCORE) * 100);

  const benchmark = getBenchmark(profession);
  const percentile = calculatePercentile(
    totalScore,
    benchmark.mean,
    benchmark.stdDev
  );

  const { persona, description } = getPersona(percentage);
  const dimensionScores = scoreDimensions(responses);

  return {
    totalScore,
    maxScore: MAX_SCORE,
    percentage,
    percentile,
    persona,
    personaDescription: description,
    dimensionScores,
  };
}

export const DIMENSION_LABELS: Record<QuizDimension, string> = {
  frequency: "Frequency",
  breadth: "Breadth",
  depth: "Depth",
  investment: "Investment",
  integration: "Integration",
};

export const DIMENSION_INSIGHTS: Record<
  QuizDimension,
  (score: number) => string
> = {
  frequency: (s) =>
    s >= 75
      ? "You reach for AI constantly — it's a reflex, not a decision."
      : s >= 50
      ? "You use AI regularly, but there's still room to make it a daily habit."
      : "You use AI occasionally. Building a daily rhythm unlocks the biggest gains.",
  breadth: (s) =>
    s >= 75
      ? "Your tool diversity is well above average for your field."
      : s >= 50
      ? "You've moved beyond a single chatbot — keep exploring specialized tools."
      : "You rely on a narrow set of tools. A few targeted additions go a long way.",
  depth: (s) =>
    s >= 75
      ? "You're running advanced workflows most people haven't tried yet."
      : s >= 50
      ? "You handle real work with AI, not just simple lookups."
      : "Your usage is mostly surface-level. The value jumps sharply at the next tier.",
  investment: (s) =>
    s >= 75
      ? "You invest in the tools that return real hours — a hallmark of heavy users."
      : s >= 50
      ? "You've committed to at least one paid tool. The ROI compounds with more."
      : "You're mostly on free tiers. Upgrading one tool often pays back within a week.",
  integration: (s) =>
    s >= 75
      ? "AI is fused into your workflow — you'd feel it if it disappeared tomorrow."
      : s >= 50
      ? "AI shows up in parts of your day, but hasn't yet reshaped how you work."
      : "AI sits beside your workflow rather than inside it. That's the next leap.",
};

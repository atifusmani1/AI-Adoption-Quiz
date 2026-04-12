export type QuizDimension =
  | "frequency"
  | "breadth"
  | "depth"
  | "investment"
  | "integration";

export interface QuizOption {
  label: string;
  value: number; // 0–4 scoring scale
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtext?: string;
  options: QuizOption[];
  dimension: QuizDimension;
}

export interface QuizResponse {
  questionId: number;
  answer: string;
  value: number;
}

export interface QuizResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  percentile: number;
  persona: string;
  personaDescription: string;
  dimensionScores: Record<QuizDimension, number>;
}

export interface UserState {
  /**
   * Step indices:
   *   0      → profession select
   *   1–10   → questions 1 through 10
   *   11     → email capture
   *   12     → results
   *   13     → paywall
   */
  currentStep: number;
  profession: string;
  responses: QuizResponse[];
  email: string;
  result: QuizResult | null;
  startedAt: string;
  completedAt: string | null;
}

export const QUIZ_STEPS = {
  PROFESSION: 0,
  FIRST_QUESTION: 1,
  LAST_QUESTION: 10,
  EMAIL: 11,
  RESULTS: 12,
  PAYWALL: 13,
} as const;

export const TOTAL_QUESTIONS = 10;

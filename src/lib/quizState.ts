"use client";

import { useEffect, useReducer, useRef } from "react";
import type { QuizResponse, QuizResult, UserState } from "@/types/quiz";

const STORAGE_KEY = "adaptai:quiz-state:v1";

export function createInitialState(): UserState {
  return {
    currentStep: 0,
    profession: "",
    responses: [],
    email: "",
    result: null,
    startedAt: new Date().toISOString(),
    completedAt: null,
  };
}

export type QuizAction =
  | { type: "SET_PROFESSION"; profession: string }
  | { type: "ANSWER_QUESTION"; response: QuizResponse }
  | { type: "SET_EMAIL"; email: string }
  | { type: "SET_RESULT"; result: QuizResult }
  | { type: "GO_TO_STEP"; step: number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "MARK_COMPLETED" }
  | { type: "RESET" }
  | { type: "HYDRATE"; state: UserState };

export function quizReducer(state: UserState, action: QuizAction): UserState {
  switch (action.type) {
    case "SET_PROFESSION":
      return { ...state, profession: action.profession };

    case "ANSWER_QUESTION": {
      const existingIdx = state.responses.findIndex(
        (r) => r.questionId === action.response.questionId
      );
      const responses = [...state.responses];
      if (existingIdx >= 0) {
        responses[existingIdx] = action.response;
      } else {
        responses.push(action.response);
      }
      return { ...state, responses };
    }

    case "SET_EMAIL":
      return { ...state, email: action.email };

    case "SET_RESULT":
      return { ...state, result: action.result };

    case "GO_TO_STEP":
      return { ...state, currentStep: action.step };

    case "NEXT_STEP":
      return { ...state, currentStep: state.currentStep + 1 };

    case "PREV_STEP":
      return {
        ...state,
        currentStep: Math.max(0, state.currentStep - 1),
      };

    case "MARK_COMPLETED":
      return { ...state, completedAt: new Date().toISOString() };

    case "HYDRATE":
      return action.state;

    case "RESET":
      return createInitialState();

    default:
      return state;
  }
}

function loadFromSession(): UserState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UserState;
    if (typeof parsed.currentStep !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveToSession(state: UserState) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota errors
  }
}

export function clearQuizSession() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // noop
  }
}

export function useQuizState() {
  const [state, dispatch] = useReducer(quizReducer, undefined, createInitialState);
  const hydratedRef = useRef(false);

  // Hydrate from sessionStorage on mount (client-only)
  useEffect(() => {
    const saved = loadFromSession();
    if (saved) {
      dispatch({ type: "HYDRATE", state: saved });
    }
    hydratedRef.current = true;
  }, []);

  // Persist on every change (only after hydration so we don't overwrite saved state on first render)
  useEffect(() => {
    if (!hydratedRef.current) return;
    saveToSession(state);
  }, [state]);

  return { state, dispatch } as const;
}

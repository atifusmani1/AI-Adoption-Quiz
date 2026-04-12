"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { QUESTIONS } from "@/lib/questions";
import { QUIZ_STEPS } from "@/types/quiz";
import { computeQuizResult } from "@/lib/scoring";
import { useQuizState } from "@/lib/quizState";
import ProgressBar from "@/components/ProgressBar";
import ProfessionSelect from "@/components/ProfessionSelect";
import QuizQuestion from "@/components/QuizQuestion";
import EmailCapture from "@/components/EmailCapture";
import Results from "@/components/Results";
import Paywall from "@/components/Paywall";

const AUTO_ADVANCE_DELAY_MS = 400;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
  }),
};

export default function Quiz() {
  const { state, dispatch } = useQuizState();
  const [direction, setDirection] = useState(1);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  const goForward = useCallback(
    (step?: number) => {
      setDirection(1);
      if (typeof step === "number") {
        dispatch({ type: "GO_TO_STEP", step });
      } else {
        dispatch({ type: "NEXT_STEP" });
      }
    },
    [dispatch]
  );

  const goBack = useCallback(() => {
    setDirection(-1);
    dispatch({ type: "PREV_STEP" });
  }, [dispatch]);

  const handleSelectProfession = useCallback(
    (profession: string) => {
      dispatch({ type: "SET_PROFESSION", profession });
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(() => {
        goForward(QUIZ_STEPS.FIRST_QUESTION);
      }, AUTO_ADVANCE_DELAY_MS);
    },
    [dispatch, goForward]
  );

  const handleAnswerQuestion = useCallback(
    (questionId: number, answer: { label: string; value: number }) => {
      dispatch({
        type: "ANSWER_QUESTION",
        response: {
          questionId,
          answer: answer.label,
          value: answer.value,
        },
      });
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(() => {
        const next =
          state.currentStep >= QUIZ_STEPS.LAST_QUESTION
            ? QUIZ_STEPS.EMAIL
            : state.currentStep + 1;
        goForward(next);
      }, AUTO_ADVANCE_DELAY_MS);
    },
    [dispatch, goForward, state.currentStep]
  );

  const handleSubmitEmail = useCallback(
    (email: string) => {
      dispatch({ type: "SET_EMAIL", email });
      const result = computeQuizResult(state.responses, state.profession);
      dispatch({ type: "SET_RESULT", result });
      goForward(QUIZ_STEPS.RESULTS);
    },
    [dispatch, goForward, state.profession, state.responses]
  );

  const currentStep = state.currentStep;
  const isQuestion =
    currentStep >= QUIZ_STEPS.FIRST_QUESTION &&
    currentStep <= QUIZ_STEPS.LAST_QUESTION;

  const currentQuestion = isQuestion
    ? QUESTIONS[currentStep - 1]
    : null;

  const currentResponse = currentQuestion
    ? state.responses.find((r) => r.questionId === currentQuestion.id) ?? null
    : null;

  const canShowBack =
    currentStep > 0 && currentStep <= QUIZ_STEPS.EMAIL;

  return (
    <main className="relative min-h-screen bg-cream text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-6 md:px-10">
        {/* Header row */}
        <header className="flex items-center justify-between py-8">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-ink transition-opacity hover:opacity-70"
          >
            adapt<span className="text-ink-muted">.ai</span>
          </Link>
          {canShowBack && (
            <button
              type="button"
              onClick={goBack}
              className="text-xs uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-ink"
            >
              ← Back
            </button>
          )}
        </header>

        {/* Progress */}
        {currentStep <= QUIZ_STEPS.EMAIL && (
          <div className="mx-auto w-full max-w-[640px]">
            <ProgressBar step={currentStep} />
          </div>
        )}

        {/* Step content */}
        <section
          className={`flex flex-1 py-12 ${
            currentStep >= QUIZ_STEPS.RESULTS
              ? "items-start"
              : "items-center justify-center"
          }`}
        >
          <div className="relative mx-auto w-full max-w-[640px]">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {currentStep === QUIZ_STEPS.PROFESSION && (
                  <ProfessionSelect
                    selected={state.profession}
                    onSelect={handleSelectProfession}
                  />
                )}

                {isQuestion && currentQuestion && (
                  <QuizQuestion
                    question={currentQuestion}
                    selectedValue={currentResponse?.value ?? null}
                    onAnswer={(answer) =>
                      handleAnswerQuestion(currentQuestion.id, answer)
                    }
                  />
                )}

                {currentStep === QUIZ_STEPS.EMAIL && (
                  <EmailCapture
                    initialEmail={state.email}
                    onSubmit={handleSubmitEmail}
                  />
                )}

                {currentStep === QUIZ_STEPS.RESULTS && state.result && (
                  <Results
                    result={state.result}
                    profession={state.profession}
                    onContinue={() => goForward(QUIZ_STEPS.PAYWALL)}
                  />
                )}

                {currentStep === QUIZ_STEPS.PAYWALL && (
                  <Paywall userState={state} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}

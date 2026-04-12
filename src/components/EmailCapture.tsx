"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

interface EmailCaptureProps {
  initialEmail: string;
  onSubmit: (email: string) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailCapture({
  initialEmail,
  onSubmit,
}: EmailCaptureProps) {
  const [email, setEmail] = useState(initialEmail);
  const [touched, setTouched] = useState(false);

  const isValid = EMAIL_REGEX.test(email.trim());
  const showError = touched && !isValid;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    onSubmit(email.trim());
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <h2 className="text-display-md">
          Almost there.
        </h2>
        <p className="mt-3 text-fg-muted">
          Enter your email to see your AdaptAI report and personalized tool
          recommendations.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        onSubmit={handleSubmit}
        className="mx-auto mt-10 flex w-full max-w-md flex-col gap-4"
      >
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            className={`w-full rounded-2xl border bg-white px-5 py-4 text-base text-fg placeholder:text-fg-faint shadow-soft transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 ${
              showError
                ? "border-red-400 focus:border-red-400"
                : "border-line focus:border-accent"
            }`}
          />
          {showError && (
            <p className="mt-2 text-xs text-red-500">
              Please enter a valid email address.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`btn-primary w-full ${
            !isValid ? "cursor-not-allowed opacity-30 hover:translate-y-0 hover:shadow-none" : ""
          }`}
        >
          See My Results
          <span aria-hidden="true">&rarr;</span>
        </button>

        <p className="text-center text-xs text-fg-faint">
          We&rsquo;ll never share your email. No spam.
        </p>
      </motion.form>
    </div>
  );
}

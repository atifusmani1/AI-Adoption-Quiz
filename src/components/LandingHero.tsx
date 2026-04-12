"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingHero() {
  return (
    <main className="relative min-h-screen bg-cream text-ink">
      <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col px-6 md:px-10">
        {/* Top wordmark */}
        <header className="flex items-center justify-between py-8">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg font-semibold tracking-tight text-ink"
          >
            adapt<span className="text-ink-muted">.ai</span>
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden text-xs uppercase tracking-[0.18em] text-ink-muted md:block"
          >
            2025 Adoption Index
          </motion.span>
        </header>

        {/* Hero — minimal: question, subtext, CTA */}
        <section className="flex flex-1 flex-col items-center justify-center py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-4xl text-display-xl font-semibold text-ink"
          >
            How well have you adapted to AI compared to others in your field?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-base text-ink-muted md:text-lg"
          >
            10 questions. Real industry data. See where you stand.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12"
          >
            <Link href="/quiz" className="btn-primary">
              Start the Quiz
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </section>

        {/* Bottom footer row */}
        <footer className="py-8 text-center text-xs uppercase tracking-[0.18em] text-ink-faint">
          Data from McKinsey · Pew Research · Brookings
        </footer>
      </div>
    </main>
  );
}

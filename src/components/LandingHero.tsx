"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    title: "10 Questions",
    description: "A quick assessment of your AI habits across 5 key dimensions.",
    icon: "◆",
  },
  {
    title: "Industry Benchmarks",
    description:
      "Compared against real survey data from McKinsey, Pew Research & Brookings.",
    icon: "▲",
  },
  {
    title: "Personalized Results",
    description:
      "Get your score, ranking, persona, and hand-picked tool recommendations.",
    icon: "●",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
};

export default function LandingHero() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="bg-orbs" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Top nav */}
        <header className="flex items-center justify-between py-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_20px_#7C3AED]" />
            AI Edge
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden text-xs uppercase tracking-[0.18em] text-white/50 md:block"
          >
            2025 Adoption Index
          </motion.span>
        </header>

        {/* Hero */}
        <section className="flex min-h-[calc(100vh-180px)] flex-col items-center justify-center py-16 text-center md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-white/70 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Built on real survey data
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="font-display text-display-xl font-bold"
          >
            What&rsquo;s Your{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#A78BFA] via-[#7C3AED] to-[#4F46E5] bg-clip-text text-transparent">
                AI Edge
              </span>
              <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
            </span>
            ?
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            Discover where you rank in AI adoption among professionals in your
            field. Backed by real industry data from 10,000+ survey respondents.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link href="/quiz" className="btn-primary text-base">
              Find Your Ranking
              <span aria-hidden="true">→</span>
            </Link>
            <span className="text-xs uppercase tracking-[0.18em] text-white/40">
              Takes 2 minutes · Free
            </span>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            className="mt-16 flex items-center gap-3 text-sm text-white/50"
          >
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-7 w-7 rounded-full border-2 border-[#0A0A0A] bg-gradient-to-br from-accent/60 to-indigo-500/60"
                />
              ))}
            </div>
            <span>
              Based on data from <strong className="text-white/80">10,000+</strong>{" "}
              survey respondents across industries
            </span>
          </motion.div>
        </section>

        {/* Feature cards */}
        <section className="py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-accent">
              How it works
            </span>
            <h2 className="mt-3 font-display text-display-md font-semibold">
              Three steps to your ranking
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass-card group rounded-3xl p-8 transition-all duration-300"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-xl text-accent ring-1 ring-accent/20 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-10 text-center text-xs uppercase tracking-[0.18em] text-white/40">
          AI Edge · 2025 Adoption Index · Data from McKinsey, Pew & Brookings
        </footer>
      </div>
    </main>
  );
}

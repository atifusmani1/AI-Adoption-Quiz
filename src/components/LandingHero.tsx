"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function NormalCurve() {
  const points: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const x = (i / 40) * 100;
    const t = (i / 40) * 6 - 3;
    const y = Math.exp(-0.5 * t * t) / Math.sqrt(2 * Math.PI);
    const yScaled = 100 - y * 250;
    points.push(`${x},${yScaled}`);
  }
  const polyline = points.join(" ");
  const area = `0,100 ${polyline} 100,100`;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
      <polygon points={area} fill="rgba(34,197,94,0.12)" />
      <polyline points={polyline} fill="none" stroke="#22C55E" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const steps = [
  {
    num: "01",
    title: "Select your field",
    desc: "Choose your profession so we can benchmark you against the right peers.",
    graphic: (
      <div className="grid grid-cols-3 gap-1.5">
        {["SWE", "Mktg", "Fin", "Health", "Design", "PM"].map((l) => (
          <div key={l} className="rounded-lg bg-bg-elevated px-2 py-1.5 text-center text-[10px] font-medium text-fg-muted">
            {l}
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "02",
    title: "Answer 10 questions",
    desc: "Quick multiple-choice covering frequency, breadth, depth, investment, and integration.",
    graphic: (
      <div className="space-y-2">
        {[85, 60, 40].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-bg-elevated">
              <div className="h-full rounded-full bg-accent" style={{ width: `${w}%` }} />
            </div>
            <span className="text-[10px] tabular-nums text-fg-faint">{w}%</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "03",
    title: "Get your ranking",
    desc: "See your percentile, persona, dimension breakdown, and recommended tools.",
    graphic: (
      <div className="h-full w-full">
        <NormalCurve />
      </div>
    ),
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as number[] },
});

export default function LandingHero() {
  return (
    <main className="relative min-h-screen bg-bg text-fg">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Nav */}
        <header className="flex items-center justify-between py-6">
          <motion.div {...fadeUp(0)} className="flex items-center gap-2">
            <Image src="/logos/adapt-ai-logo.svg" alt="AdaptAI" width={28} height={28} className="object-contain" />
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-fg">
              AdaptAI
            </span>
          </motion.div>
          <motion.div {...fadeUp(0.05)} className="flex items-center gap-4">
            <Link
              href="/quiz"
              className="btn-primary px-5 py-2.5 text-sm"
            >
              Start Quiz
            </Link>
          </motion.div>
        </header>

        {/* Hero */}
        <section className="pb-20 pt-20 text-center md:pb-28 md:pt-32">
          <motion.h1
            {...fadeUp(0.1)}
            className="mx-auto max-w-3xl text-display-xl"
          >
            How well have you
            <br />
            adapted to <span className="text-accent">AI</span>?
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-fg-muted md:text-lg"
          >
            See where you rank among professionals in your field.
            10 questions. Real industry data. Instant results.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-10">
            <Link href="/quiz" className="btn-primary px-8 py-3.5 text-base">
              Start quiz
            </Link>
          </motion.div>
        </section>

        {/* Process */}
        <section id="process" className="pb-20 md:pb-28">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-display-lg"
          >
            Our process
          </motion.h2>

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="light-card flex flex-col p-6"
              >
                <div className="mb-5 flex h-28 items-end rounded-2xl bg-bg-elevated p-4">
                  <div className="w-full h-full">{s.graphic}</div>
                </div>
                <span className="text-sm font-semibold text-accent">
                  {s.num}.
                </span>
                <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What you get */}
        <section className="pb-20 md:pb-28">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-display-lg"
          >
            What you get
          </motion.h2>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                title: "Percentile ranking",
                desc: "See exactly where you stand relative to other professionals in your field, powered by data from McKinsey, Pew, and Brookings.",
                visual: (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-fg-faint">Your ranking</span>
                      <span className="text-xs font-semibold text-accent">84th</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-bg-elevated">
                      <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-accent/50 to-accent" />
                    </div>
                  </div>
                ),
              },
              {
                title: "Tool recommendations",
                desc: "Get hand-picked AI tools tailored to your profession and current skill level, with direct links to start using them today.",
                visual: (
                  <div className="flex flex-wrap gap-2">
                    {[
                      { src: "/logos/claude.svg", alt: "Claude", bg: "bg-[#F5E6D8]" },
                      { src: "/logos/chatgpt.png", alt: "ChatGPT", bg: "bg-[#E8F5EF]" },
                      { src: "/logos/cursor.png", alt: "Cursor", bg: "bg-[#F5F5F5]" },
                      { src: "/logos/copilot.png", alt: "GitHub Copilot", bg: "bg-[#F5F5F5]" },
                      { src: "/logos/canva.jpeg", alt: "Canva", bg: "bg-white" },
                      { src: "/logos/Japser.png", alt: "Jasper", bg: "bg-white" },
                      { src: "/logos/langchain.png", alt: "LangChain", bg: "bg-[#E8F0E8]" },
                      { src: "/logos/vercel.png", alt: "Vercel", bg: "bg-[#F5F5F5]" },
                    ].map(({ src, alt, bg }) => (
                      <div key={alt} className={`flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden ${bg}`}>
                        <Image src={src} alt={alt} width={22} height={22} className="object-contain" />
                      </div>
                    ))}
                  </div>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="light-card p-6"
              >
                <div className="mb-5 rounded-2xl bg-bg-elevated p-5">
                  {item.visual}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-line py-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <Image src="/logos/adapt-ai-logo.svg" alt="AdaptAI" width={24} height={24} className="object-contain" />
              <span className="text-sm font-semibold uppercase tracking-[0.15em] text-fg">
                AdaptAI
              </span>
            </div>
            <p className="text-xs text-fg-faint">
              Data from McKinsey, Pew Research, Brookings & YouGov
            </p>
            <Link
              href="/quiz"
              className="text-sm font-medium text-accent transition-opacity hover:opacity-80"
            >
              Take the quiz
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

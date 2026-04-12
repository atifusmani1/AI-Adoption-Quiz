export default function QuizPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-6">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="relative z-10 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-accent">
          Coming in Phase 4
        </span>
        <h1 className="mt-4 font-display text-display-md font-bold">
          Quiz flow lands here
        </h1>
        <p className="mt-3 text-white/60">
          Profession select → 10 questions → email → results → paywall.
        </p>
      </div>
    </main>
  );
}

# AdaptAI — AI Adoption Quiz

A web-based quiz that measures how well you've adapted to AI in your profession. Answer 10 questions, get a percentile ranking against others in your field, and receive personalized AI tool recommendations.

## How It Works

1. **Landing Page** — Overview of the assessment with a call-to-action to start the quiz.
2. **Select Your Field** — Choose from 10 professions (Software Engineering, Marketing, Finance, Healthcare, etc.).
3. **Answer 10 Questions** — Multiple choice questions covering five dimensions of AI adoption: frequency, breadth, depth, investment, and integration.
4. **Email Capture** — Enter your email with basic validation before viewing results.
5. **Results** — See your score, percentile ranking, persona type, dimension breakdown, and top 3 recommended AI tools.
6. **Paywall** — A UI-only paywall offering a full report. No real payment is processed.

At the end of the flow, quiz data is automatically submitted via POST request and a `submission.json` file can be downloaded.

## Tech Stack

- **Next.js 16** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations and transitions

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/             — Pages (landing, quiz)
  components/      — UI components (Quiz, Results, Paywall, etc.)
  lib/             — Scoring engine, benchmarks, questions, recommendations
  types/           — TypeScript type definitions
public/
  logos/            — Tool and brand logo assets
submission.json    — Example payload matching the POST request
```

## Data Handling

When a user completes the full quiz flow, two things happen:

1. **POST request** — All collected data (email, responses, score, recommendations, metadata) is sent as JSON to an external endpoint.
2. **Downloadable file** — The same payload is available as a `submission.json` download from the paywall screen.

The `submission.json` in the project root contains an example of this payload.

## Deployment

Deployed on **Vercel**. No environment variables or server-side configuration needed — the POST request runs client-side from the browser.

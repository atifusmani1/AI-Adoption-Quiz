/**
 * Profession-level AI adoption benchmarks.
 *
 * Means and standard deviations are modeled distributions on the 0–40 score
 * scale (10 questions × max value 4). They are calibrated against published
 * 2024–2025 research so the percentile ranking reflects realistic positioning:
 *
 *   - McKinsey 2025 State of AI: 78% of orgs use AI in at least one function;
 *     tech/media/telecom lead (≈90%+ adoption), marketing/sales and IT are
 *     the top usage functions, healthcare and legal are emerging.
 *   - Pew Research 2025: 21% of US workers use AI at work; 28% of bachelors+,
 *     16% of some-college-or-less; 31% of adults interact with AI multiple
 *     times daily. 56% of US adults have used AI tools.
 *   - Brookings / YouGov 2025: 76% of adults under 30 have used AI, 50% weekly;
 *     ~40% of working-age adults use generative AI regularly.
 *   - Industry reports consistently place software engineering, product
 *     management, design, and marketing as highest adopters; healthcare,
 *     legal, and finance as mid-to-lower due to compliance + workflow friction.
 *
 * The distributions are NOT raw survey data — they are calibrated so that a
 * typical respondent in the profession lands near the published adoption
 * rate, and outliers on either end are plausible.
 */

export interface ProfessionBenchmark {
  mean: number;
  stdDev: number;
  /** Short descriptor used in results copy, e.g. "software engineers". */
  audienceLabel: string;
  /** Known top tools in this field — used for context, not for scoring. */
  topTools: string[];
}

export const professionBenchmarks: Record<string, ProfessionBenchmark> = {
  "Software Engineering": {
    mean: 28,
    stdDev: 7,
    audienceLabel: "software engineers",
    topTools: ["GitHub Copilot", "Claude Code", "Cursor", "ChatGPT", "Claude"],
  },
  "Marketing & Sales": {
    mean: 22,
    stdDev: 8,
    audienceLabel: "marketing & sales professionals",
    topTools: ["ChatGPT", "Jasper", "Canva AI", "HubSpot AI", "Clay"],
  },
  "Finance & Accounting": {
    mean: 16,
    stdDev: 7,
    audienceLabel: "finance & accounting professionals",
    topTools: ["ChatGPT", "Excel Copilot", "Anaplan AI", "Bloomberg GPT"],
  },
  Healthcare: {
    mean: 14,
    stdDev: 8,
    audienceLabel: "healthcare professionals",
    topTools: ["ChatGPT", "Abridge", "Nuance DAX", "Glass AI"],
  },
  Education: {
    mean: 16,
    stdDev: 8,
    audienceLabel: "educators",
    topTools: ["ChatGPT", "MagicSchool", "Khanmigo", "Grammarly"],
  },
  "Design & Creative": {
    mean: 24,
    stdDev: 7,
    audienceLabel: "designers & creatives",
    topTools: ["Figma AI", "Midjourney", "Adobe Firefly", "Runway", "ChatGPT"],
  },
  Legal: {
    mean: 13,
    stdDev: 7,
    audienceLabel: "legal professionals",
    topTools: ["Harvey", "Casetext CoCounsel", "Lexis+ AI", "ChatGPT"],
  },
  "Operations & HR": {
    mean: 17,
    stdDev: 8,
    audienceLabel: "operations & HR professionals",
    topTools: ["ChatGPT", "Notion AI", "Gong", "Zapier AI"],
  },
  "Product Management": {
    mean: 26,
    stdDev: 7,
    audienceLabel: "product managers",
    topTools: ["ChatGPT", "Claude", "Notion AI", "Linear AI", "Perplexity"],
  },
  Other: {
    mean: 18,
    stdDev: 9,
    audienceLabel: "knowledge workers",
    topTools: ["ChatGPT", "Claude", "Perplexity", "Notion AI"],
  },
};

export function getBenchmark(profession: string): ProfessionBenchmark {
  return professionBenchmarks[profession] ?? professionBenchmarks.Other;
}

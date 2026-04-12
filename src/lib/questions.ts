import type { QuizQuestion } from "@/types/quiz";

export const PROFESSIONS: { label: string; icon: string }[] = [
  { label: "Software Engineering", icon: "⌘" },
  { label: "Marketing & Sales", icon: "◎" },
  { label: "Finance & Accounting", icon: "$" },
  { label: "Healthcare", icon: "✚" },
  { label: "Education", icon: "✎" },
  { label: "Design & Creative", icon: "◆" },
  { label: "Legal", icon: "§" },
  { label: "Operations & HR", icon: "○" },
  { label: "Product Management", icon: "▲" },
  { label: "Other", icon: "∗" },
];

export const QUESTIONS: QuizQuestion[] = [
  // --- Frequency ---
  {
    id: 1,
    dimension: "frequency",
    question: "How often do you use AI tools in your work?",
    subtext: "Think about tools like ChatGPT, Claude, Copilot, or Gemini.",
    options: [
      { label: "Never", value: 0 },
      { label: "A few times a month", value: 1 },
      { label: "A few times a week", value: 2 },
      { label: "Daily", value: 3 },
      { label: "Multiple times per day", value: 4 },
    ],
  },
  {
    id: 2,
    dimension: "frequency",
    question: "How often do you use AI for personal tasks outside of work?",
    options: [
      { label: "Never", value: 0 },
      { label: "Rarely", value: 1 },
      { label: "Monthly", value: 2 },
      { label: "Weekly", value: 3 },
      { label: "Daily", value: 4 },
    ],
  },

  // --- Breadth ---
  {
    id: 3,
    dimension: "breadth",
    question: "How many different AI tools or platforms do you actively use?",
    options: [
      { label: "None", value: 0 },
      { label: "1", value: 1 },
      { label: "2–3", value: 2 },
      { label: "4–5", value: 3 },
      { label: "6 or more", value: 4 },
    ],
  },
  {
    id: 4,
    dimension: "breadth",
    question: "Which categories of AI do you use?",
    subtext: "Pick the closest match to your overall usage.",
    options: [
      { label: "None", value: 0 },
      { label: "Just chatbots like ChatGPT", value: 1 },
      { label: "Chatbots plus writing tools", value: 2 },
      { label: "Chatbots, writing, image or code tools", value: 3 },
      { label: "A full suite across categories", value: 4 },
    ],
  },

  // --- Depth ---
  {
    id: 5,
    dimension: "depth",
    question: "How would you describe your typical AI usage?",
    options: [
      { label: "I don't use AI", value: 0 },
      { label: "Simple questions and lookups", value: 1 },
      { label: "Drafting content and summarizing", value: 2 },
      { label: "Complex workflows and analysis", value: 3 },
      { label: "Building automations and custom agents", value: 4 },
    ],
  },
  {
    id: 6,
    dimension: "depth",
    question: "Have you used AI for any of the following?",
    subtext: "Pick the most advanced task that applies.",
    options: [
      { label: "None of these", value: 0 },
      { label: "Writing emails or messages", value: 1 },
      { label: "Creating presentations or documents", value: 2 },
      { label: "Data analysis or coding", value: 3 },
      { label: "Building AI-powered tools or automations", value: 4 },
    ],
  },

  // --- Investment ---
  {
    id: 7,
    dimension: "investment",
    question: "Do you pay for any AI tools?",
    options: [
      { label: "No, only free tiers", value: 0 },
      { label: "Yes, one paid subscription", value: 1 },
      { label: "Yes, 2–3 paid subscriptions", value: 2 },
      { label: "Yes, 4 or more paid subscriptions", value: 3 },
      { label: "Yes, and I also use API access", value: 4 },
    ],
  },
  {
    id: 8,
    dimension: "investment",
    question: "How much time per week do you estimate AI saves you?",
    options: [
      { label: "No time saved", value: 0 },
      { label: "Under 1 hour", value: 1 },
      { label: "1–3 hours", value: 2 },
      { label: "3–5 hours", value: 3 },
      { label: "5 or more hours", value: 4 },
    ],
  },

  // --- Integration ---
  {
    id: 9,
    dimension: "integration",
    question: "How integrated is AI into your core workflow?",
    options: [
      { label: "Not at all", value: 0 },
      { label: "I try it occasionally", value: 1 },
      { label: "It's part of some tasks", value: 2 },
      { label: "It's embedded in my daily process", value: 3 },
      { label: "I can't imagine working without it", value: 4 },
    ],
  },
  {
    id: 10,
    dimension: "integration",
    question: "Has AI changed the way you approach your work?",
    options: [
      { label: "Not at all", value: 0 },
      { label: "Slightly", value: 1 },
      { label: "Moderately", value: 2 },
      { label: "Significantly", value: 3 },
      { label: "Completely transformed it", value: 4 },
    ],
  },
];

export const MAX_SCORE = QUESTIONS.length * 4; // 40

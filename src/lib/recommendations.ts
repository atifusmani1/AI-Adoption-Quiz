export interface ToolRecommendation {
  name: string;
  description: string;
  url: string;
  why: string;
}

export interface ProfessionRecommendations {
  low: ToolRecommendation[];
  high: ToolRecommendation[];
}

/**
 * Real products with real links. Low tier = newcomers/explorers who need
 * easy-to-adopt foundational tools. High tier = active/power users ready for
 * advanced, specialized, or API-level tooling.
 */
export const recommendations: Record<string, ProfessionRecommendations> = {
  "Software Engineering": {
    low: [
      {
        name: "GitHub Copilot",
        description: "AI pair programmer that suggests code in your editor.",
        url: "https://github.com/features/copilot",
        why: "The fastest way to add AI to your existing dev workflow.",
      },
      {
        name: "Cursor",
        description: "AI-first code editor built on VS Code.",
        url: "https://cursor.com",
        why: "Feels like VS Code but with Claude built into every keystroke.",
      },
      {
        name: "Claude",
        description: "Conversational AI assistant for coding and technical Q&A.",
        url: "https://claude.ai",
        why: "Best-in-class for reading large codebases and debugging.",
      },
      {
        name: "ChatGPT",
        description: "General-purpose AI assistant with code interpreter.",
        url: "https://chat.openai.com",
        why: "The default starting point for quick prototypes and lookups.",
      },
    ],
    high: [
      {
        name: "Claude Code",
        description: "Agentic AI coding tool that runs in your terminal.",
        url: "https://claude.com/product/claude-code",
        why: "Autonomously plans and ships full-stack changes across your repo.",
      },
      {
        name: "Claude API",
        description: "Build custom AI-powered tools with Anthropic's API.",
        url: "https://docs.anthropic.com",
        why: "Ship features with the same model behind Claude Code.",
      },
      {
        name: "Vercel AI SDK",
        description: "Typescript toolkit for building AI-powered streaming UIs.",
        url: "https://sdk.vercel.ai",
        why: "Production-grade streaming, tool calling, and RAG primitives.",
      },
      {
        name: "LangChain",
        description: "Framework for building LLM-powered applications.",
        url: "https://www.langchain.com",
        why: "Standard plumbing for agents, retrieval, and evaluation.",
      },
    ],
  },

  "Marketing & Sales": {
    low: [
      {
        name: "ChatGPT",
        description: "General-purpose AI for drafting, research, and brainstorming.",
        url: "https://chat.openai.com",
        why: "The fastest way to cut first-draft time on any campaign asset.",
      },
      {
        name: "Jasper",
        description: "AI content platform tuned for marketing teams.",
        url: "https://www.jasper.ai",
        why: "Brand voice controls keep AI output on-message at scale.",
      },
      {
        name: "Canva AI (Magic Studio)",
        description: "AI-powered design tools inside Canva.",
        url: "https://www.canva.com/magic-studio/",
        why: "Launch on-brand graphics without a designer in the loop.",
      },
      {
        name: "Perplexity",
        description: "AI answer engine for fast market research.",
        url: "https://www.perplexity.ai",
        why: "Replaces 20 Google tabs when researching competitors or trends.",
      },
    ],
    high: [
      {
        name: "Clay",
        description: "AI-powered lead enrichment and outbound sequencing.",
        url: "https://www.clay.com",
        why: "Automates the research + personalization loop across your CRM.",
      },
      {
        name: "HubSpot AI (Breeze)",
        description: "CRM with built-in AI for marketing and sales workflows.",
        url: "https://www.hubspot.com/products/artificial-intelligence",
        why: "Brings AI into pipeline actions where your team already lives.",
      },
      {
        name: "Descript",
        description: "AI-native audio and video editor for content teams.",
        url: "https://www.descript.com",
        why: "Edit podcasts and videos by editing the transcript.",
      },
      {
        name: "Gong",
        description: "AI revenue intelligence and call coaching.",
        url: "https://www.gong.io",
        why: "Surfaces patterns across calls your team can't track manually.",
      },
    ],
  },

  "Finance & Accounting": {
    low: [
      {
        name: "ChatGPT",
        description: "AI assistant for financial analysis and drafting.",
        url: "https://chat.openai.com",
        why: "Explain a 10-K, draft a memo, or scaffold a model in minutes.",
      },
      {
        name: "Microsoft Copilot for Excel",
        description: "AI built directly into Excel for analysis and formulas.",
        url: "https://www.microsoft.com/en-us/microsoft-365/copilot",
        why: "Natural-language formulas and analysis right inside your sheets.",
      },
      {
        name: "Perplexity Finance",
        description: "AI answer engine with live market and filings data.",
        url: "https://www.perplexity.ai/finance",
        why: "Fast, cited answers on public filings and market data.",
      },
      {
        name: "Claude",
        description: "AI assistant strong at long-document analysis.",
        url: "https://claude.ai",
        why: "Pastes in full 10-Ks and contracts without hitting limits.",
      },
    ],
    high: [
      {
        name: "Hebbia",
        description: "AI research platform for financial analysts.",
        url: "https://www.hebbia.com",
        why: "Purpose-built for diligence across thousands of documents.",
      },
      {
        name: "Rogo",
        description: "AI financial analyst for investment workflows.",
        url: "https://rogo.ai",
        why: "Automates sourcing, screening, and first-pass analysis.",
      },
      {
        name: "AlphaSense",
        description: "AI-powered market intelligence and research.",
        url: "https://www.alpha-sense.com",
        why: "Semantic search across earnings calls, filings, and broker research.",
      },
      {
        name: "Claude API",
        description: "Build custom document analysis pipelines.",
        url: "https://docs.anthropic.com",
        why: "Program your own diligence and reporting agents.",
      },
    ],
  },

  Healthcare: {
    low: [
      {
        name: "ChatGPT",
        description: "General-purpose AI for research and drafting.",
        url: "https://chat.openai.com",
        why: "Fastest way to summarize literature and draft patient-friendly copy.",
      },
      {
        name: "Glass AI",
        description: "Clinical reasoning and differential diagnosis assistant.",
        url: "https://glass.health",
        why: "Built specifically for clinicians, not general consumers.",
      },
      {
        name: "OpenEvidence",
        description: "AI-powered medical reference for clinicians.",
        url: "https://www.openevidence.com",
        why: "Free, citation-backed answers on clinical questions.",
      },
      {
        name: "Consensus",
        description: "AI search engine for peer-reviewed research.",
        url: "https://consensus.app",
        why: "Turns PubMed into a natural-language research assistant.",
      },
    ],
    high: [
      {
        name: "Abridge",
        description: "AI medical scribe for clinical documentation.",
        url: "https://www.abridge.com",
        why: "Ambient note-taking during patient visits — saves hours a day.",
      },
      {
        name: "Nuance DAX Copilot",
        description: "Ambient AI scribe integrated with major EHRs.",
        url: "https://www.microsoft.com/en-us/health-solutions/clinical-workflow/dax-copilot",
        why: "Enterprise-grade ambient documentation inside Epic and Cerner.",
      },
      {
        name: "Suki",
        description: "Voice-enabled AI assistant for physicians.",
        url: "https://www.suki.ai",
        why: "Generates notes, orders, and codes from natural conversation.",
      },
      {
        name: "Hippocratic AI",
        description: "Safety-focused LLM platform for healthcare.",
        url: "https://www.hippocraticai.com",
        why: "Purpose-built agents for patient-facing healthcare workflows.",
      },
    ],
  },

  Education: {
    low: [
      {
        name: "ChatGPT",
        description: "General-purpose AI for lesson planning and drafting.",
        url: "https://chat.openai.com",
        why: "Cuts prep time on lessons, rubrics, and parent communications.",
      },
      {
        name: "MagicSchool",
        description: "AI platform built for teachers.",
        url: "https://www.magicschool.ai",
        why: "60+ teacher-specific tools in one place, free to start.",
      },
      {
        name: "Khanmigo",
        description: "AI tutor and teaching assistant from Khan Academy.",
        url: "https://www.khanmigo.ai",
        why: "Student-safe AI aligned with proven learning science.",
      },
      {
        name: "Grammarly",
        description: "AI writing assistant for feedback and editing.",
        url: "https://www.grammarly.com",
        why: "Helps both teachers and students with clearer writing.",
      },
    ],
    high: [
      {
        name: "Claude",
        description: "Conversational AI strong at long-document analysis.",
        url: "https://claude.ai",
        why: "Build custom curriculum and analyze student work in bulk.",
      },
      {
        name: "Diffit",
        description: "AI tool that differentiates any text to any reading level.",
        url: "https://beta.diffit.me",
        why: "Instantly levels reading material for every student in the room.",
      },
      {
        name: "Brisk Teaching",
        description: "AI Chrome extension for teachers across Google tools.",
        url: "https://www.briskteaching.com",
        why: "Meets teachers inside Docs, Slides, and Classroom.",
      },
      {
        name: "School AI",
        description: "Safe AI platform with student monitoring and spaces.",
        url: "https://schoolai.com",
        why: "District-grade controls plus real AI for students.",
      },
    ],
  },

  "Design & Creative": {
    low: [
      {
        name: "Figma AI",
        description: "AI features built directly into Figma.",
        url: "https://www.figma.com/ai/",
        why: "AI where you already design — no new tool to learn.",
      },
      {
        name: "Midjourney",
        description: "Best-in-class AI image generation.",
        url: "https://www.midjourney.com",
        why: "The fastest way to generate mood boards and concept art.",
      },
      {
        name: "Adobe Firefly",
        description: "Commercially-safe generative AI in the Adobe suite.",
        url: "https://www.adobe.com/products/firefly.html",
        why: "Licensed training data you can actually ship to clients.",
      },
      {
        name: "ChatGPT",
        description: "General-purpose AI for copy and concepting.",
        url: "https://chat.openai.com",
        why: "Strong at naming, taglines, and creative briefs.",
      },
    ],
    high: [
      {
        name: "Runway",
        description: "AI video generation and editing platform.",
        url: "https://runwayml.com",
        why: "State-of-the-art generative video for motion teams.",
      },
      {
        name: "Krea",
        description: "Real-time generative AI for images and video.",
        url: "https://www.krea.ai",
        why: "Real-time AI canvas that keeps up with creative flow.",
      },
      {
        name: "Ideogram",
        description: "AI image generator strong at typography and text.",
        url: "https://ideogram.ai",
        why: "Finally nails in-image text for posters and packaging.",
      },
      {
        name: "ComfyUI",
        description: "Node-based interface for Stable Diffusion workflows.",
        url: "https://www.comfy.org",
        why: "Total control over generation pipelines for production work.",
      },
    ],
  },

  Legal: {
    low: [
      {
        name: "ChatGPT",
        description: "General-purpose AI for drafting and research.",
        url: "https://chat.openai.com",
        why: "Cuts first-draft time on memos, letters, and summaries.",
      },
      {
        name: "Claude",
        description: "AI strong at long-document review.",
        url: "https://claude.ai",
        why: "Handles large contracts and filings without chunking.",
      },
      {
        name: "Spellbook",
        description: "AI contract drafting and review in Microsoft Word.",
        url: "https://www.spellbook.legal",
        why: "Lives inside Word where contract drafting already happens.",
      },
      {
        name: "Perplexity",
        description: "AI answer engine with citations.",
        url: "https://www.perplexity.ai",
        why: "Fast, sourced answers for quick legal research questions.",
      },
    ],
    high: [
      {
        name: "Harvey",
        description: "AI platform built for elite law firms.",
        url: "https://www.harvey.ai",
        why: "Purpose-built for complex legal workflows at scale.",
      },
      {
        name: "Thomson Reuters CoCounsel",
        description: "AI legal assistant (formerly Casetext).",
        url: "https://www.thomsonreuters.com/en/artificial-intelligence/cocounsel",
        why: "Trusted research, review, and drafting with enterprise data.",
      },
      {
        name: "Lexis+ AI",
        description: "Generative AI integrated with LexisNexis research.",
        url: "https://www.lexisnexis.com/en-us/products/lexis-plus-ai.page",
        why: "Grounded in the full LexisNexis legal corpus.",
      },
      {
        name: "Ironclad AI",
        description: "AI-powered contract lifecycle management.",
        url: "https://ironcladapp.com/product/ai",
        why: "Automates review and redlining across your CLM.",
      },
    ],
  },

  "Operations & HR": {
    low: [
      {
        name: "ChatGPT",
        description: "General-purpose AI for drafting and analysis.",
        url: "https://chat.openai.com",
        why: "First stop for policy drafts, job descriptions, and comms.",
      },
      {
        name: "Notion AI",
        description: "AI built into Notion for summaries, drafts, and Q&A.",
        url: "https://www.notion.so/product/ai",
        why: "AI inside the doc tool your ops team already uses.",
      },
      {
        name: "Grammarly",
        description: "AI writing assistant for professional communications.",
        url: "https://www.grammarly.com",
        why: "Raises the floor on every message your team sends.",
      },
      {
        name: "Otter.ai",
        description: "AI meeting notes and transcription.",
        url: "https://otter.ai",
        why: "Eliminates the scribe role in recurring ops meetings.",
      },
    ],
    high: [
      {
        name: "Zapier AI",
        description: "AI actions and agents across 6000+ apps.",
        url: "https://zapier.com/ai",
        why: "Builds end-to-end AI automations without engineering help.",
      },
      {
        name: "Gong",
        description: "AI-powered call intelligence and coaching.",
        url: "https://www.gong.io",
        why: "Surfaces trends across hiring and vendor calls at scale.",
      },
      {
        name: "Paradox",
        description: "Conversational AI assistant for recruiting.",
        url: "https://www.paradox.ai",
        why: "Automates scheduling and candidate screening end-to-end.",
      },
      {
        name: "Relay.app",
        description: "AI-native workflow automation with human-in-the-loop.",
        url: "https://www.relay.app",
        why: "Purpose-built for ops workflows that need approvals.",
      },
    ],
  },

  "Product Management": {
    low: [
      {
        name: "ChatGPT",
        description: "General-purpose AI for PRDs, research, and synthesis.",
        url: "https://chat.openai.com",
        why: "The fastest way to scaffold a PRD or turn notes into specs.",
      },
      {
        name: "Claude",
        description: "AI strong at long-form reasoning and document analysis.",
        url: "https://claude.ai",
        why: "Best for synthesizing research docs and user interviews.",
      },
      {
        name: "Notion AI",
        description: "AI built into Notion for summaries and drafting.",
        url: "https://www.notion.so/product/ai",
        why: "Works inside the product spec tool you already use.",
      },
      {
        name: "Perplexity",
        description: "AI answer engine with cited sources.",
        url: "https://www.perplexity.ai",
        why: "Fastest path to competitive and market research.",
      },
    ],
    high: [
      {
        name: "Linear",
        description: "AI-native issue tracking and planning.",
        url: "https://linear.app",
        why: "AI that understands your roadmap and writes tickets for you.",
      },
      {
        name: "Dovetail",
        description: "AI-powered customer research platform.",
        url: "https://dovetail.com",
        why: "Turns raw interview transcripts into themed insights automatically.",
      },
      {
        name: "v0 by Vercel",
        description: "AI UI generation from prompts.",
        url: "https://v0.dev",
        why: "Prototype real React UIs without waiting on a designer.",
      },
      {
        name: "Claude API",
        description: "Build custom AI into your own product.",
        url: "https://docs.anthropic.com",
        why: "Ship AI features yourself — don't wait on the eng queue.",
      },
    ],
  },

  Other: {
    low: [
      {
        name: "ChatGPT",
        description: "General-purpose AI assistant — the best starting point.",
        url: "https://chat.openai.com",
        why: "The most versatile free tool to build an AI habit.",
      },
      {
        name: "Claude",
        description: "AI assistant strong at long documents and reasoning.",
        url: "https://claude.ai",
        why: "Complements ChatGPT with deeper document analysis.",
      },
      {
        name: "Perplexity",
        description: "AI answer engine with cited sources.",
        url: "https://www.perplexity.ai",
        why: "Your new default for any question you'd Google.",
      },
      {
        name: "Notion AI",
        description: "AI built into your notes and docs.",
        url: "https://www.notion.so/product/ai",
        why: "Adds AI where you already work, with no new app to learn.",
      },
    ],
    high: [
      {
        name: "Zapier AI",
        description: "AI automation across 6000+ apps.",
        url: "https://zapier.com/ai",
        why: "Build personal AI workflows without writing code.",
      },
      {
        name: "Claude Projects",
        description: "Persistent AI workspaces with your own knowledge.",
        url: "https://claude.ai",
        why: "Dedicated AI contexts for each of your recurring workflows.",
      },
      {
        name: "ElevenLabs",
        description: "AI voice generation and audio tools.",
        url: "https://elevenlabs.io",
        why: "Studio-quality voice AI for content, dubbing, and prototypes.",
      },
      {
        name: "Gamma",
        description: "AI-powered presentations and documents.",
        url: "https://gamma.app",
        why: "Turn any prompt into a polished deck in under a minute.",
      },
    ],
  },
};

/**
 * Pick recommendations for a given profession and score percentage.
 * Splits at 50% — below is low tier, at or above is high tier.
 */
export function getRecommendations(
  profession: string,
  percentage: number
): ToolRecommendation[] {
  const bucket = recommendations[profession] ?? recommendations.Other;
  return percentage >= 50 ? bucket.high : bucket.low;
}

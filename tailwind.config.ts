import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F5F3EE",
          light: "#FBFAF5",
          dark: "#EEEBE0",
        },
        ink: {
          DEFAULT: "#0A0A0A",
          soft: "#1F1F1F",
          muted: "#5E5D5A",
          faint: "#8A8880",
        },
        line: "#E7E3D8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.75rem, 6.5vw, 5.25rem)",
          { lineHeight: "1.05", letterSpacing: "-0.035em" },
        ],
        "display-lg": [
          "clamp(2.25rem, 5vw, 3.75rem)",
          { lineHeight: "1.08", letterSpacing: "-0.03em" },
        ],
        "display-md": [
          "clamp(1.75rem, 3.5vw, 2.5rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em" },
        ],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10,10,10,0.04), 0 8px 24px -12px rgba(10,10,10,0.08)",
        lift: "0 2px 4px rgba(10,10,10,0.05), 0 20px 40px -16px rgba(10,10,10,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

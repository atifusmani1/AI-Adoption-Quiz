import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#FFFFFF",
          card: "#FFFFFF",
          elevated: "#F7F8FA",
          hover: "#F0F2F5",
          muted: "#F9FAFB",
        },
        fg: {
          DEFAULT: "#111111",
          muted: "#6B7280",
          faint: "#9CA3AF",
        },
        accent: {
          DEFAULT: "#22C55E",
          hover: "#16A34A",
          light: "#DCFCE7",
          dim: "rgba(34,197,94,0.08)",
        },
        line: "#E5E7EB",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.75rem, 6.5vw, 4.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.035em", fontWeight: "700" },
        ],
        "display-lg": [
          "clamp(2rem, 4.5vw, 3rem)",
          { lineHeight: "1.12", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "display-md": [
          "clamp(1.5rem, 3.5vw, 2rem)",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        card: "0 4px 24px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.04)",
        elevated: "0 12px 48px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
        glow: "0 0 40px rgba(34,197,94,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

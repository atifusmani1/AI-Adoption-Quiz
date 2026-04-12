import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "What's Your AI Edge? | AI Adoption Quiz",
  description:
    "Discover where you rank in AI adoption compared to others in your profession. Backed by real industry survey data.",
  openGraph: {
    title: "What's Your AI Edge?",
    description:
      "Take the quiz and find out where you rank in AI usage among professionals in your field.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What's Your AI Edge?",
    description: "Take the quiz and find out where you rank in AI usage.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}

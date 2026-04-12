import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AdaptAI — How Well Have You Adapted?",
  description:
    "See how your AI usage compares to others in your profession. 10 questions, real industry benchmarks, instant results.",
  openGraph: {
    title: "AdaptAI — How Well Have You Adapted?",
    description:
      "See how your AI usage compares to others in your profession. 10 questions, real industry benchmarks, instant results.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdaptAI — How Well Have You Adapted?",
    description:
      "See how your AI usage compares to others in your profession. 10 questions, real industry benchmarks, instant results.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}

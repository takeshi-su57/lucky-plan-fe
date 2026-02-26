import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import { Providers } from "@/lib/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    default: "LuckyPlans | Perpetual DEX Analytics & Backtesting Infrastructure",
    template: "%s | LuckyPlans",
  },
  description:
    "Unified analytics across $552B+ in perpetual DEX volume. Leaderboards and deterministic backtesting for gTrade (GNS), GMX, and Avantis (AVNT) on Arbitrum, Base, Polygon, MegaETH, and Ethereum. Open source.",
  keywords: [
    "perpetual DEX",
    "perp trading",
    "gTrade",
    "GNS",
    "Gains Network",
    "GMX",
    "Avantis",
    "AVNT",
    "leaderboard",
    "backtesting engine",
    "algorithmic trading",
    "DeFi infrastructure",
    "DeFi analytics",
    "perpetual futures",
    "Arbitrum",
    "Base",
    "Polygon",
    "MegaETH",
    "Ethereum",
    "EVM",
    "multi-chain",
    "on-chain verification",
    "perp DEX leaderboard",
    "copy trading",
    "open source",
  ],
  authors: [{ name: "LuckyPlans" }],
  creator: "LuckyPlans",
  openGraph: {
    title: "LuckyPlans | $552B+ Perpetual DEX Volume, One Analytics Layer",
    description:
      "Full leaderboard analytics and deterministic backtesting across gTrade, GMX, and Avantis. Multi-chain EVM. Verifiable. Open source.",
    url: "https://luckyplans.com",
    siteName: "LuckyPlans",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuckyPlans | $552B+ Perpetual DEX Volume, One Analytics Layer",
    description:
      "Full leaderboard analytics and deterministic backtesting across gTrade, GMX, and Avantis. Multi-chain EVM. Verifiable. Open source.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL("https://luckyplans.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

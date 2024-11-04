import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";
import "@/styles/globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Lucky Plan",
  description: "This is a UI for Lucky Plan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(`antialiased dark`, geistSans.variable, geistMono.variable)}
      >
        {children}
      </body>
    </html>
  );
}

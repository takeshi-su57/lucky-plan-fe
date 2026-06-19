import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";
import "@/styles/globals.css";

import { Providers } from "./providers";

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
  topbar,
  sidebar,
  statusbar,
}: Readonly<{
  children: React.ReactNode;
  topbar: React.ReactNode;
  sidebar: React.ReactNode;
  statusbar: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          `light antialiased`,
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <Providers>
          <div className="bg-background text-foreground flex h-screen w-screen flex-col overflow-hidden font-sans">
            <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(135deg,#fafafa,#f4f4f5_52%,#e4e4e7)]" />
            <div className="relative flex min-h-0 flex-1">
              <div className="border-default-200 bg-content1/90 hidden h-full w-[214px] shrink-0 flex-col overflow-auto border-r backdrop-blur-xl lg:flex">
                {sidebar}
              </div>

              <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
                <div className="border-default-200 bg-content1/90 sticky top-0 z-50 w-full border-b px-4 py-3 shadow-[0_10px_28px_rgba(24,24,27,0.08)] backdrop-blur-xl md:px-5">
                  {topbar}
                </div>
                <main className="relative z-0 min-h-0 w-full flex-1 overflow-auto px-4 py-5 md:px-5">
                  {children}
                </main>
              </div>
            </div>

            <div className="border-default-200 bg-content1/90 relative h-8 w-full shrink-0 border-t px-4 md:px-5">
              {statusbar}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

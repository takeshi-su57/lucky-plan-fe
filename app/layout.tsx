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
          `antialiased dark`,
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <Providers>
          <div className="flex h-screen w-screen flex-col bg-neutral-900 font-sans">
            <div className="flex h-[calc(100%-32px)] w-full">
              <div className="flex h-full w-[300px] flex-col overflow-auto border-r border-neutral-800">
                {sidebar}
              </div>

              <div className="relative flex h-full flex-1 flex-col overflow-auto">
                <div className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-900 p-4">
                  {topbar}
                </div>
                <div className="relative z-0 w-full p-4">{children}</div>
              </div>
            </div>

            <div className="h-8 w-full shrink-0 border-t border-neutral-400/20 p-4">
              {statusbar}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

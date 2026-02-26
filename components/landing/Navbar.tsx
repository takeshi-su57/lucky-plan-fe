"use client";

import { useState } from "react";
import { GitHubIcon } from "@/components/icons/GitHubIcon";

const navItems = [
  { label: "Platform", href: "#infrastructure" },
  { label: "Chains", href: "#chains" },
  { label: "Developers", href: "#developers" },
  { label: "Artifacts", href: "#proof" },
  { label: "Team", href: "#team" },
  { label: "Lab Notes", href: "#lab-notes" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 md:px-8">
        <p className="text-lg font-bold text-neutral-900">
          Lucky<span className="text-green-600">Plans</span>
        </p>

        <div className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://github.com/takeshi-su57/lucky-plan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <GitHubIcon size={20} />
          </a>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-neutral-500 lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-neutral-200 bg-white/95 px-6 pb-6 pt-4 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-lg text-neutral-700 transition-colors hover:text-neutral-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://github.com/takeshi-su57/lucky-plan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg text-neutral-700 transition-colors hover:text-neutral-900"
            >
              <GitHubIcon size={20} />
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

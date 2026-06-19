// hero.ts
import { heroui } from "@heroui/react";
// or import from theme package if you are using individual packages.
// import { heroui } from "@heroui/theme";
export default heroui({
  addCommonColors: true,
  layout: {
    fontSize: {
      tiny: "0.6875rem",
      small: "0.78125rem",
      medium: "0.8125rem",
      large: "0.875rem",
      DEFAULT: "0.8125rem",
    },
    lineHeight: {
      tiny: "0.875rem",
      small: "1rem",
      medium: "1.125rem",
      large: "1.25rem",
      DEFAULT: "1.125rem",
    },
    radius: {
      small: "0.375rem",
      medium: "0.5rem",
      large: "0.625rem",
    },
    borderWidth: {
      small: "1px",
      medium: "1px",
      large: "2px",
    },
    boxShadow: {
      small: "0 8px 24px rgb(0 0 0 / 0.16)",
      medium: "0 16px 42px rgb(0 0 0 / 0.22)",
      large: "0 24px 72px rgb(0 0 0 / 0.32)",
    },
  },
  themes: {
    light: {
      colors: {
        background: {
          DEFAULT: "#f4f4f5",
        },
        foreground: {
          DEFAULT: "#18181b",
        },
        divider: {
          DEFAULT: "rgba(24,24,27,0.12)",
        },
        focus: {
          DEFAULT: "#2563eb",
        },
        content1: {
          DEFAULT: "#ffffff",
          foreground: "#18181b",
        },
        content2: {
          DEFAULT: "#f4f4f5",
          foreground: "#27272a",
        },
        content3: {
          DEFAULT: "#e4e4e7",
          foreground: "#27272a",
        },
        content4: {
          DEFAULT: "#d4d4d8",
          foreground: "#18181b",
        },
        default: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          DEFAULT: "#e4e4e7",
          foreground: "#18181b",
        },
        primary: {
          DEFAULT: "#2563eb",
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "#16a34a",
          foreground: "#ffffff",
        },
        danger: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
      },
    },
    dark: {
      colors: {
        background: {
          DEFAULT: "#111113",
        },
        foreground: {
          DEFAULT: "#f4f4f5",
        },
        divider: {
          DEFAULT: "rgba(255,255,255,0.12)",
        },
        focus: {
          DEFAULT: "#60a5fa",
        },
        content1: {
          DEFAULT: "#18181b",
          foreground: "#f4f4f5",
        },
        content2: {
          DEFAULT: "#202124",
          foreground: "#e4e4e7",
        },
        content3: {
          DEFAULT: "#27272a",
          foreground: "#e4e4e7",
        },
        content4: {
          DEFAULT: "#3f3f46",
          foreground: "#f4f4f5",
        },
        default: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          DEFAULT: "#3f3f46",
          foreground: "#f4f4f5",
        },
        primary: {
          DEFAULT: "#0ea5e9",
          foreground: "#f8fafc",
        },
        success: {
          DEFAULT: "#10b981",
          foreground: "#ecfdf5",
        },
        danger: {
          DEFAULT: "#f43f5e",
          foreground: "#fff1f2",
        },
      },
    },
  },
});

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        sm: "24px",
        lg: "32px",
        xl: "48px"
      },
      screens: {
        "2xl": "1240px"
      }
    },
    extend: {
      colors: {
        vm: {
          bg: "#F2F4F1",
          "bg-alt": "#F7FAFA",
          surface: "#FFFFFF",
          line: "#E2E2D6",
          "line-cool": "#E6EEF2",
          "line-soft": "#EFF4F6",
          ink: "#1A1A1A",
          "ink-2": "#101820",
          graphite: "#2B2B2B",
          muted: "#5A5A52",
          "muted-2": "#6A6A60",
          "muted-3": "#9A9A90",
          cyan: "#16D4E8",
          "cyan-deep": "#0FB8CC",
          blue: "#0B6EFF",
          "blue-deep": "#0850BF",
          panel: "#0E1620",
          "panel-2": "#131C27",
          "panel-text": "#D5DEE6",
          ok: "#1F9D6F",
          warn: "#C97A1B",
          crit: "#C03B3B",
          live: "#34D399"
        }
      },
      fontFamily: {
        sans: ["var(--vm-font-sans-loaded)", "system-ui", "sans-serif"],
        serif: ["var(--vm-font-serif-loaded)", "Georgia", "serif"],
        mono: ["var(--vm-font-mono-loaded)", "ui-monospace", "monospace"]
      },
      fontSize: {
        mono: ["11px", { lineHeight: "1.4", letterSpacing: "0.14em" }],
        small: ["13.5px", { lineHeight: "1.5" }]
      },
      borderRadius: {
        DEFAULT: "12px",
        sm: "8px",
        lg: "16px",
        pill: "999px"
      },
      boxShadow: {
        "vm-sm": "0 1px 0 rgba(255,255,255,.06) inset, 0 4px 12px -6px rgba(16,24,32,.08)",
        vm: "0 1px 0 rgba(255,255,255,.06) inset, 0 8px 24px -10px rgba(16,24,32,.18)",
        "vm-lg": "0 1px 0 rgba(255,255,255,.06) inset, 0 30px 60px -40px rgba(11,24,38,.18)",
        "vm-cta": "0 8px 24px -10px rgba(16,24,32,.35)",
        "vm-cta-h": "0 12px 28px -10px rgba(16,24,32,.5)",
        "vm-cyan": "0 8px 28px -8px rgba(22,212,232,.45)"
      },
      transitionTimingFunction: {
        "vm-ease": "cubic-bezier(0.2, 0.7, 0.2, 1)",
        "vm-out": "cubic-bezier(0.16, 1, 0.3, 1)"
      },
      transitionDuration: {
        fast: "150ms",
        DEFAULT: "250ms",
        slow: "400ms"
      },
      backgroundImage: {
        "vm-grid": `
          linear-gradient(to right, #EFF4F6 1px, transparent 1px),
          linear-gradient(to bottom, #EFF4F6 1px, transparent 1px)
        `
      },
      backgroundSize: {
        "vm-grid": "64px 64px"
      },
      maxWidth: {
        prose: "60ch",
        "prose-narrow": "48ch",
        "prose-sub": "54ch"
      },
      keyframes: {
        "vm-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".6", transform: "scale(1.15)" }
        },
        "vm-fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "vm-pulse": "vm-pulse 2.4s ease-in-out infinite",
        "vm-fade-up": "vm-fade-up 400ms cubic-bezier(0.16, 1, 0.3, 1) both"
      }
    }
  },
  plugins: []
};

export default config;

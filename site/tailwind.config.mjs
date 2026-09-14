/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f7f8",
          100: "#eeeef1",
          200: "#d8d8de",
          300: "#b3b3bd",
          400: "#85858f",
          500: "#5b5b66",
          600: "#3f3f49",
          700: "#2a2a32",
          800: "#181820",
          900: "#0d0d12",
          950: "#06060a",
        },
        cedar: {
          50: "#fbf6ee",
          100: "#f4e8d4",
          200: "#e8cfa6",
          300: "#dab078",
          400: "#cb9153",
          500: "#bc7a3c",
          600: "#a8632f",
          700: "#894c28",
          800: "#6e3d27",
          900: "#5a3322",
          950: "#311a11",
        },
        ember: {
          400: "#ff8a5c",
          500: "#ff6a33",
          600: "#ed4d12",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "InterDisplay",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
      },
      boxShadow: {
        glow: "0 0 80px -10px rgba(188,122,60,0.45)",
        "glow-lg": "0 0 140px -20px rgba(188,122,60,0.55)",
        soft: "0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 48px -24px rgba(0,0,0,0.6)",
        ring: "0 0 0 1px rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(60% 60% at 50% 0%, rgba(188,122,60,0.18), transparent 70%)",
        "conic-glow":
          "conic-gradient(from 180deg at 50% 50%, rgba(188,122,60,0.0) 0deg, rgba(188,122,60,0.18) 90deg, rgba(188,122,60,0.0) 180deg, rgba(85,113,255,0.18) 270deg, rgba(188,122,60,0.0) 360deg)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.9s ease forwards",
        "shimmer": "shimmer 8s linear infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        "drift": "drift 18s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-12px,0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

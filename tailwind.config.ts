import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./stores/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "\"SF Pro Display\"",
          "\"SF Pro Text\"",
          "\"Segoe UI\"",
          "sans-serif"
        ]
      },
      colors: {
        graphite: {
          950: "#050607",
          900: "#0b0c0f",
          850: "#121418",
          800: "#1a1d24"
        }
      },
      boxShadow: {
        "mac-window":
          "0 36px 90px rgba(0,0,0,0.45), 0 12px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
        dock: "0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
        keycap:
          "0 22px 28px rgba(10,14,20,0.3), 0 10px 0 rgba(79,93,122,0.75), inset 0 1px 0 rgba(255,255,255,0.95)"
      },
      keyframes: {
        "window-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.9) translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)"
          }
        },
        "breathing-bg": {
          "0%, 100%": {
            transform: "scale(1) translate3d(0,0,0)"
          },
          "50%": {
            transform: "scale(1.06) translate3d(0,-1.5%,0)"
          }
        },
        "status-pulse": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)"
          },
          "50%": {
            opacity: ".7",
            transform: "scale(0.92)"
          }
        }
      },
      animation: {
        "window-in": "window-in 450ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "breathing-bg": "breathing-bg 16s ease-in-out infinite",
        "status-pulse": "status-pulse 2s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;

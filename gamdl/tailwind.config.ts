import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "ibm-plex-sans": ["IBM Plex Sans", "sans-serif"],
        "bebas-neue": ["var(--bebas-neue)"],
      },
      colors: {
        primary: "#E7C9A5",
        "primary-admin": "#25388C", // Changed from admin-primary to match naming convention
        "dark-100": "#16191E",
        "dark-200": "#3A354E",
        "dark-300": "#232839",
        "dark-400": "#1E293B",
        "dark-500": "#0F172A",
        "dark-600": "#333C5C",
        "dark-700": "#464F6F",
        "dark-800": "#1E2230",
        "light-100": "#D6E0FF",
        "light-200": "#EED1AC",
        "light-300": "#F8F8FF",
        "light-400": "#EDF1F1",
        "light-500": "#8D8D8D",
        "light-600": "#F9FAFB",
        "light-700": "#E2E8F0",
        "light-800": "#F8FAFC",
        green: "#027A48",
        "green-100": "#ECFDF3",
        "green-400": "#4C7B62",
        "green-500": "#2CC171",
        "green-800": "#027A48",
        red: "#EF3A4B",
        "red-400": "#F46F70",
        "red-500": "#E27233",
        "red-800": "#EF3A4B",
        "blue-100": "#0089F1",
        "gray-100": "#CBD5E1",
        // HSL color variables
        background: {
          DEFAULT: "hsl(var(--background))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
        },
        input: {
          DEFAULT: "hsl(var(--input))",
        },
        ring: {
          DEFAULT: "hsl(var(--ring))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      screens: {
        xs: "480px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        pattern: "url('/images/pattern.webp')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
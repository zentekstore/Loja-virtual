import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#0284c7",
          dark: "#0369a1",
          light: "#38bdf8",
        },
        accent: {
          DEFAULT: "#f97316",
          dark: "#ea580c",
          light: "#fb923c",
        },
      },
    },
  },
  plugins: [],
};
export default config;

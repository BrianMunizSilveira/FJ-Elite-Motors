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
        primary: {
          DEFAULT: "#1a1a1a", // Dark charcoal
          foreground: "#f8f8f8",
        },
        secondary: {
          DEFAULT: "#c0c0c0", // Silver
          foreground: "#1a1a1a",
        },
        accent: {
          DEFAULT: "#e63946", // Sharp Red
          foreground: "#ffffff",
        },
        gold: {
          DEFAULT: "#d4af37",
          foreground: "#1a1a1a",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3490dc",
          dark: "#2779bd",
          light: "#6cb2eb",
        },
        secondary: {
          DEFAULT: "#ffed4a",
          dark: "#f2d024",
          light: "#fff382",
        },
        accent: {
          DEFAULT: "#f66d9b",
          dark: "#eb5286",
          light: "#fa7ea8",
        },
      },
    },
  },
  plugins: [],
};

export default config;

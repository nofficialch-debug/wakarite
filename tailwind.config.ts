import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["LINE Seed JP", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", "sans-serif"]
      },
      colors: {
        ink: "#283044",
        candy: "#ff77b7",
        skysoft: "#8bd8ff",
        lilac: "#a78bfa"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(87, 93, 139, 0.15)"
      }
    }
  },
  plugins: []
};

export default config;

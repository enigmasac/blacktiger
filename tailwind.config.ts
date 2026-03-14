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
        primary: "#111111",
        secondary: "#070707",
        accent: "#000000",
        text: "#1A1A1A",
        peach: "#FFBC7D",
        salmon: "#FFA6A6",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)"],
        roboto: ["var(--font-roboto-slab)"],
        raleway: ["var(--font-raleway)"],
      },
      maxWidth: {
        site: "1366px",
      },
      borderRadius: {
        btn: "12px",
      },
    },
  },
  plugins: [],
};
export default config;

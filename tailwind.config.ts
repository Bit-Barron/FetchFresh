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
        inputbg: "#F6F7F8",
        bg: "#F6F7F8"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

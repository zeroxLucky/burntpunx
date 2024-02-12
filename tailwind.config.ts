import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        shift: {
          "0%": { transform: "translateX(0px, 0px)" },
          "10%": { transform: "translate(-100px, 100px)" },
          "20%": { transform: "translate(150px, -100px)" },
          "30%": { transform: "translate(-100px, 100px)" },
          "40%": { transform: "translate(100px, -150px)" },
          "50%": { transform: "translate(-100px, 200px)" },
          "60%": { transform: "translate(-200px, -100px)" },
          "70%": { transform: "translateY(50px, 100px)" },
          "80%": { transform: "translate(100px, -150px)" },
          "90%": { transform: "translate(0px, 200px)" },
          "100%": { transform: "translate(-100px, 100px)" },
        },
      },
      animation: {
        shift: "shift linear 1s infinite both",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;

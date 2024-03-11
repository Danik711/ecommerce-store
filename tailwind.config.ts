import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      flex: {
        "2": "2 2 0%",
        "3": "3 3 0%",
      },
      width: {
        "my-inherit": "inherit",
      },
      maxWidth: {
        "500": "300px",
      },
      colors: {
        mainBlue: "#0EA5E9",
        disabled: "#E5E7EB",
        categoryBackground: "#F2F3F7",
      },
    },
    screens: {
      "3xs": "280px",
      "2xs": "300px",
      "my-xs": "450px",
      "my-660": "660px",
      "my-380": "380px",
      "my-450": "450px",
      "my-500": "500px",
      "my-550": "550px",
      "my-650": "650px",
      "my-350": "350px",
      "my-900": "900px",
      "my-800": "800px",
      "my-1400": "1400px",
      "header-width": "408px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
export default config;

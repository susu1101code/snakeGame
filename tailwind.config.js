/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        empty: "#ffffff",
        snake: "#008000FF",
        food: "#FF0000FF",
        wall: "#000000FF",
        disable: "#5D5D5DFF",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        "dynamic-col-50px": "repeat(var(--col-num), 50px)",
      },
      gridTemplateRows: {
        "dynamic-row-50px": "repeat(var(--row-num), 50px)",
      },
    },
  },
  plugins: [],
};

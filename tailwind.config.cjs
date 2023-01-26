/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: "#18181b",
        gray: {
          950: "#18181b",
        },
        red: {
          450: "#fe5f55",
        },
        lemon: {
          200: "#fcf99c",
          400: "#faf33e",
        },
        purple: {
          1000: "#451B66",
        },
      },
    },
  },
  plugins: [],
};

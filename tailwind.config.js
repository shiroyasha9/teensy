/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
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
      },
    },
  },
  plugins: [],
};

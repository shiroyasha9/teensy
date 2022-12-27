/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          950: "#18181b",
        },
        lemon: {
          400: "#faf33e",
        },
      },
    },
  },
  plugins: [],
};

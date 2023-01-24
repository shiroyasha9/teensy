/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  endOfLine: "auto",
};

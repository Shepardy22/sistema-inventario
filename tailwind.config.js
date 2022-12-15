/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: {
          100: "#212529",
        },
        secondaryBg: {
          100: "#2c3034",
        }
      }
    },
  },
  plugins: [],
}
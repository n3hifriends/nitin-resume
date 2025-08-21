/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enable dark mode using the 'class' strategy
  theme: {
    extend: {
      fontFamily: {
        muli: ["Muli", "sans-serif"],
      },
    },
  },
  plugins: [],
};

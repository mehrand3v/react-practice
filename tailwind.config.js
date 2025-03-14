// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // This is important for class-based dark mode toggling
  theme: {
    extend: {},
  },
  plugins: [],
};

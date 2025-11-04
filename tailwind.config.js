/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",       // ✅ tells Tailwind to scan your HTML file
    "./src/**/*.{html,js,jsx}"   // ✅ also scans src for any classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

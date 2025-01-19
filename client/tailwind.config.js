/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1) Points Tailwind at your files for purge (if using older Tailwind) or content scanning
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",   // Adjust to your actual React file paths
    "./public/index.html",
  ],
  theme: {
    extend: {
      // Customize your theme here if needed
    },
  },
  // 2) Add the Typography plugin here
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

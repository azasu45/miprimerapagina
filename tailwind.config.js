/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.html"
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    aspectRatio: true,
  },
  // plugins: [
  //   require("@tailwindcss/aspect-ratio")
  // ],
}


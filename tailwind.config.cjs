/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'wonder': '-2px 1px 14px 2px #ff805a;',
      }
    },
  },
  plugins: [],
}

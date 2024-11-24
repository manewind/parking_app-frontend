// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // проверка на все файлы в папке pages
    './components/**/*.{js,ts,jsx,tsx}', // проверка на все файлы в папке components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

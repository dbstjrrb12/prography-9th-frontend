/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      padding: {
        'top-header': '130px',
      },
      margin: {
        'top-header': '130px',
      },
    },
  },
  plugins: [],
};

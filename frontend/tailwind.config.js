/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff8f0',
          100: '#ffeedb',
          500: '#FF9933',
          600: '#e07b1a',
          700: '#bc5e0e',
        },
        indiaGreen: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#138808',
          600: '#0f6e06',
          700: '#0b5204',
        },
        chakraNavy: '#000080'
      }
    },
  },
  plugins: [],
}

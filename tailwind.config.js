/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'weather-primary': '#6A7FAB',
        'weather-secondary': '#B3D9FF',
        'weather-tertiary': '#3F5F8A',
        'wheather-gray': '#000000',
        'wheather-text': '#333333'
      },
      fontFamily: {
        'nanum-gothic': ['Nanum Gothic Coding', 'Open Sans', 'sans-serif']
      },
    },
    container: {
      padding: "2rem",
      center: true,
    },
  },
  plugins: [],
}


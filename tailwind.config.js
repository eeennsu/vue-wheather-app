/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'weather-primary': '#7E9EDD',
        'weather-secondary': '#004E71',
        'wheather-gray': '#000000'
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif']
      },
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
}


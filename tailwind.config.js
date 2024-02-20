/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'weather-primary': '#004E71',
        'weather-secondary': '#ADD8E6', 
        'weather-tertiary': '#007494',
        'wheather-gray': '#000000',
        'wheather-text': '#f5f5dc'
      },
      fontFamily: {
        'nanum-gothic': ['Noto Sans KR', 'sans-serif']
      },
    },
    container: {
      padding: "2rem",
      center: true,
    },
  },
  plugins: [],
}


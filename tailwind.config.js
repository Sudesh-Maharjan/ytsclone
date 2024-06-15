/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ytsthemecolor: "#6AC045",
        watchnow: "#0AAD9E",
        dark: {
          DEFAULT: 'black',
        },
        light: {
          DEFAULT: '#ffffff',
        },
      },
      textColor: {
        dark: '#ffffff',
        light: 'black',
      },
    },
  },
  plugins: [],
}


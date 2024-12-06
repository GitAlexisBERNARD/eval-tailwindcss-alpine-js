/** @type {import('tailwindcss').Config} */


const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/parts/**/*.html",
    "./src/components/**/*.html",
    "./src/pages/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    colors: {
      indigo: '#1d096b',
      pink: '#feaa9b',
      white: '#ffffff',
      black: '#000000',
      transparent: 'transparent',
    },
    fontFamily: {
      sans: ['Mulish', 'sans-serif'],
      serif: ['Space Mono', 'monospace']
    },
    extend: {
      gridTemplateColumns: {
        principal: 'repeat(12, minmax(0, 64px))'
      },
    },
  },
  plugins: [],
}


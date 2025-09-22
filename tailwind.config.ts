/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#F6F9FE',
          200: '#D2E3FF',
          300: '#1C65DA',
        },
        accent: {
          red: '#D9206E',
          green: '#079455',
          yellow: '#FDB022',
        },
      },
      fontFamily: {
        nunito: ['"Nunito"', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
      },
      boxShadow: {
        all: '0 0 10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neo-bg': '#FDF3E7',
        'neo-coral': '#F0645C',
        'neo-purple': '#8B7EF5',
        'neo-yellow': '#F5CB4C',
        'neo-teal': '#3FC9AE',
        'neo-orange': '#F0A868',
        'neo-pink': '#FFAEC8',
        'neo-blue': '#60A5FA',
        'neo-dark': '#141414',
        'neo-card': '#FFFFFF',
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'neo-sm': '2px 2px 0px 0px #000000',
        'neo': '4px 4px 0px 0px #000000',
        'neo-lg': '6px 6px 0px 0px #000000',
        'neo-xl': '8px 8px 0px 0px #000000',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        orbitron: ['"Orbitron"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

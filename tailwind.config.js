/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './sections/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'secondary-color': '#F0F4F4',
        'primary-color-4': '#04080F',
        'primary-color-53': '#507DBC',
        'primary-color-77': '#A1C6EA',
        'primary-color-83': '#BBD1EA',
        'danger-color': '#FF4343',
      },
      backgroundImage: {
        'gradient-to-r-90': 'linear-gradient(90deg, bg-primary-color-53 34.48%, #000000 34.48%)',
      },
      transitionTimingFunction: {
        'out-flex': 'cubic-bezier(0.05, 0.6, 0.4, 0.9)',
      },
      /* fontFamily: {
        'Montserrat': ['Montserrat', 'sans-serif'],
      }, */
    },
  },
  /* plugins: [
    function ({ addVariant }) {
        addVariant('child', '& > *');
        addVariant('child-hover', '& > *:hover');
    }
  ], */
};

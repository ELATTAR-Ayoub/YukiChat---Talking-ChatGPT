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
        'primary-grey': '#343540',
        'primary-grey-28': '#40414F',
        'primary-grey-71': '#ACACBE',
        'secondary-black': '#202123',
        'secondary-white': '#FFFFFF',
        'secondary-white-97': '#F6F6F6',
        'accent-color-71': '#FF69B4',
        'accent-color-77': '#FF8AC5',
        'danger-color': '#FF4343',
        'alert-color': '#FFCB44',
      },
      backgroundImage: {
      },
      transitionTimingFunction: {
        'out-flex': 'cubic-bezier(0.05, 0.6, 0.4, 0.9)',
      },
      /* fontFamily: {
        'Montserrat': ['Montserrat', 'sans-serif'],
      }, */
    },
  },
  plugins: [
    function ({ addVariant }) {
        addVariant('child', '& > *');
        addVariant('child-hover', '& > *:hover');
    }
  ],
};

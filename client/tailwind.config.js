module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './src/components/*.{js,jsx}',
    './public/index.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primrary: '#C62368',
        secondary: '#001220',
        tertiary: '#FA7268',
        tertiaryDark: '#E34C67',
        gradient1: '#8A2387',
        gradient2: '#E94057',
        gradient3: '#F27121',
        offerPrimary: '#FFA7B3',
        offerSecondary: '#272727',
      },
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      fontSize: ['group-hover'],
      scale: ['group-hover'],
    },
  },
  plugins: [require('tailwind-scrollbar')],
};

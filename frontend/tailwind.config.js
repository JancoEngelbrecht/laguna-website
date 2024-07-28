/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'slide-out': {
          '0%': { transform: 'translateX(0%)', opacity: '1' },
          '100%': { transform: 'translateX(20%)', opacity: '1' },
        },
        moveDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(30%)', opacity: '1' },
        },
        swing: {
          '0%': { transform: 'translateX(-30%) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateX(-30%) rotate(5deg)', opacity: '1' },
        },
        swingReverse: {
          '0%': { transform: 'translateX(0%) translateY(-5%) rotate(-5deg)', opacity: '1' },
          '100%': { transform: 'translateX(0%) translateY(-5%) rotate(5deg)', opacity: '1' },
          
        },
        swingFast: {
          '0%': { transform: 'translateX(30%) translateY(-7%) rotate(5deg)', opacity: '1' },
          '100%': { transform: 'translateX(30%) translateY(-7%) rotate(-5deg)', opacity: '1' },
        },
      },
      animation: {
        "slide-out": 'slide-out 3s ease-in-out forwards',
        moveDown: 'moveDown 1s ease-in-out forwards',
        swing: 'swing 2s ease-in-out forwards',
        swingReverse: 'swingReverse 2s ease-in-out forwards',
        swingFast: 'swingFast 2s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
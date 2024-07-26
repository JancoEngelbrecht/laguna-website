/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*/*/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'slide-out': {
          '0%': { transform: 'translateX(0%)', opacity: '1' },
          '100%': { transform: 'translateX(20%)', opacity: '1' },
        },
        swing: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '50%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        swingReverse: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        swingFast: {
          '0%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(5deg)' },
          '40%': { transform: 'rotate(-5deg)' },
          '60%': { transform: 'rotate(5deg)' },
          '80%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        "slide-out": 'slide-out 3s ease-in-out forwards',
        swing: 'swing 3s ease-in-out',
        swingReverse: 'swingReverse 3s ease-in-out',
        swingFast: 'swingFast 3s ease-in-out',
      },
    },
  },
  plugins: [],
};
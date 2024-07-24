/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*/*/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeOut: 'fadeOut 0.5s ease-out',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      boxShadow: {
        logo: '0 4px 8px rgba(0, 0, 0, 0.2)',
      },
      spacing: {
        logo: '700px',
      },
      zIndex: {
        logo: 50,
      },
    },
  },
  plugins: [],
}


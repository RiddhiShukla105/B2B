/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        neonPulse: "neonPulse 4s ease-in-out infinite",
        confetti: "confetti 900ms ease-out forwards",
      },
      keyframes: {
        neonPulse: {
          "0%,100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
        confetti: {
          "0%": { transform: "translate(0,0)", opacity: 1 },
          "100%": {
            transform: "translate(var(--x), var(--y)) rotate(360deg)",
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};

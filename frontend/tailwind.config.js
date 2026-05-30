/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a1a',
      },
      backgroundImage: {
        'mesh': 'radial-gradient(at 40% 20%, rgba(124, 58, 237, 0.3) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
}
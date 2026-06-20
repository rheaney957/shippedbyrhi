/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // F1 brand colors
        f1: {
          red: '#E10600',
          black: '#15151E',
          white: '#FFFFFF',
        },
        // Team colors (primary)
        team: {
          redbull: '#3671C6',
          ferrari: '#E8002D',
          mercedes: '#27F4D2',
          mclaren: '#FF8000',
          astonmartin: '#229971',
          alpine: '#FF87BC',
          williams: '#64C4FF',
          alphatauri: '#5E8FAA',
          alfaromeo: '#C92D4B',
          haas: '#B6BABD',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        formula: ['Formula1', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

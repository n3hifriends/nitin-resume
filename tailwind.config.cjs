/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(222.2 47.4% 11.2%)',
        card: 'hsl(0 0% 100%)',
        'muted-foreground': 'hsl(215 16.3% 46.9%)',
        accent: 'hsl(210 40% 96.1%)',
        primary: 'hsl(221.2 83.2% 53.3%)',
        secondary: 'hsl(199 89% 48%)',
      }
    },
  },
  plugins: [],
}

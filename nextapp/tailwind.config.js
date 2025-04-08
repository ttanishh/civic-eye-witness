
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'civic-primary': '#3b82f6',
        'civic-secondary': '#1d4ed8',
        'civic-dark': '#1e40af',
        'civic-light': '#dbeafe',
        'civic-success': '#10b981',
        'civic-alert': '#ef4444',
        'civic-pending': '#f59e0b',
        'electric-blue': 'rgb(33, 150, 243)',
        'neon-violet': 'rgb(156, 39, 176)',
        'neon-green': 'rgb(76, 175, 80)',
        'background': 'rgb(10, 10, 18)',
        'background-light': 'rgb(20, 20, 35)',
        'dark-card': 'rgb(15, 15, 25)',
        'border': 'rgb(30, 30, 60)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
      },
    },
  },
  plugins: [],
}

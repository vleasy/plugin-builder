/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#121212',
        'bg-surface': '#1A1A2E',
        'bg-card': 'rgba(42, 42, 60, 0.7)',
        'border-color': 'rgba(255, 255, 255, 0.08)',
        'accent-trigger': '#FBBF24',
        'accent-action': '#22D3EE',
        'accent-condition': '#F87171',
        'accent-variable': '#A78BFA',
        'text-primary': '#F1F1F1',
        'text-secondary': '#888888',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      backdropBlur: {
        glass: '12px',
      },
    },
  },
  plugins: [],
}

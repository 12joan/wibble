/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/client/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        text: 'var(--color-text)',
        border: 'var(--color-border)',
        placeholder: 'var(--color-placeholder)',
      },
    },
  },
  plugins: [],
}


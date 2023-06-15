const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

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
        primary: 'var(--color-primary)',
        'primary-dimmed-1': 'var(--color-primary-dimmed-1)',
        'primary-dimmed-2': 'var(--color-primary-dimmed-2)',
        'primary-accent': 'var(--color-primary-accent)',
        'primary-accent-dimmed-1': 'var(--color-primary-accent-dimmed-1)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        border: 'var(--color-border)',
        placeholder: 'var(--color-placeholder)',
      },
      transitionProperty: {
        default: `${defaultTheme.transitionProperty.colors}, ${defaultTheme.transitionProperty.shadow}`,
      },
      boxShadow: {
        'bottom-sheet': '0 0 25px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('hocus', ['&:hover', '&:focus-visible']);
      addVariant('group-hocus', ['.group:hover &', '.group:focus-visible &']);
      addVariant('has-lifted-focus-ring', '&:has(.lift-focus-ring:focus-visible)');
    }),
  ],
};

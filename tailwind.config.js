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
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('hocus-visible', ['&:hover', '&:focus-visible']);
      addVariant('has-lifted-focus-ring', '&:has(.lift-focus-ring:focus-visible)');
    }),
  ],
};

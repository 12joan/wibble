import { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import tailwindAnimate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './index.html',
    './src/client/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        'foreground-dimmed-1': 'var(--color-foreground-dimmed-1)',
        'foreground-dimmed-2': 'var(--color-foreground-dimmed-2)',
        primary: 'var(--color-primary)',
        'primary-dimmed-1': 'var(--color-primary-dimmed-1)',
        'primary-dimmed-2': 'var(--color-primary-dimmed-2)',
        'primary-bg': 'var(--color-primary-bg)',
        'primary-bg-dimmed-1': 'var(--color-primary-bg-dimmed-1)',
        'primary-bg-dimmed-2': 'var(--color-primary-bg-dimmed-2)',
        'overlay': 'var(--color-overlay)',
        'overlay-dimmed-1': 'var(--color-overlay-dimmed-1)',
        'overlay-dimmed-2': 'var(--color-overlay-dimmed-2)',
        danger: 'var(--color-danger)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        border: 'var(--color-border)',
        placeholder: 'var(--color-placeholder)',
      },
      boxShadow: {
        'bottom-sheet': '0 0 25px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [
    tailwindAnimate,
    plugin(({ addVariant }) => {
      const huiActive = '&[data-headlessui-state*="active"]';
      const huiSelected = '&[data-headlessui-state*="selected"]';

      addVariant('hocus', ['&:hover', '&:focus-visible', huiActive]);
      addVariant('group-hocus', ['.group:hover &', '.group:focus-visible &']);
      addVariant('group-focus-visible', '.group:focus-visible &');
      addVariant('has-lifted-focus-ring', '&:has(.lift-focus-ring:focus-visible)');
      addVariant('enabled', '&:not([disabled])');
      addVariant('selected', '&[aria-selected="true"]');
      addVariant('exiting', '.exiting &');
      addVariant('touch-device', '@media (hover: none) { & }');
      addVariant('hui-active', huiActive);
      addVariant('hui-selected', huiSelected);
    }),
  ],
};

export default config;

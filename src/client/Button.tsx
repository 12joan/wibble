import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export const buttonVariants = cva('rounded-lg transition-colors', {
  variants: {
    shape: {
      custom: '',
      rect: 'px-4 py-2 inline-block',
      icon: 'p-2 inline-block',
      menu: 'px-3 py-2 w-full text-left',
      link: '',
    },
    color: {
      normal:
        'border bg-foreground enabled:hocus:bg-foreground-dimmed-1 enabled:hocus:active:bg-foreground-dimmed-2 disabled:text-placeholder',
      primary:
        'text-white bg-primary-bg enabled:hover:bg-primary-bg-dimmed-1 enabled:hover:active:bg-primary-bg-dimmed-2 ring-offset-2',
      subtle:
        'text-primary enabled:hocus:bg-foreground-dimmed-1 enabled:hocus:active:bg-foreground-dimmed-2 disabled:text-placeholder',
      link: 'text-primary enabled:hover:text-primary-dimmed-1 enabled:hover:active:text-primary-dimmed-2 disabled:text-placeholder ring-offset-2',
      overlay:
        'bg-overlay enabled:hocus:bg-overlay-dimmed-1 enabled:hocus:active:bg-overlay-dimmed-2',
    },
  },
  defaultVariants: {
    shape: 'rect',
    color: 'normal',
  },
});

export interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, shape, color, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={twMerge(buttonVariants({ shape, color }), className)}
        {...props}
      />
    );
  }
);

import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export const buttonVariants = cva('rounded-lg', {
  variants: {
    shape: {
      rect: 'px-4 py-2',
      icon: 'p-3',
    },
    color: {
      normal: 'bg-white border',
      primary:
        'text-white bg-primary enabled:hocus:bg-primary-dimmed-1 enabled:hocus:active:bg-primary-dimmed-2 ring-offset-2',
      subtle:
        'text-primary enabled:hocus:bg-primary-accent enabled:hocus:active:bg-primary-accent-dimmed-1 disabled:text-placeholder',
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

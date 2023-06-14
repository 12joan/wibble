import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export const buttonVariants = cva(
  'rounded-lg',
  {
    variants: {
      variant: {
        rect: '',
        iconSubtle: 'p-3 enabled:hocus-visible:bg-primary-accent text-primary disabled:text-placeholder',
      }
    },
    defaultVariants: {
      variant: 'rect',
    },
  },
);

export interface ButtonProps extends VariantProps<typeof buttonVariants>, React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={twMerge(className, buttonVariants(props))}
        {...props}
      />
    );
  });

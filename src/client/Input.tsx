import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const InputGroupRoot = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        'border rounded-lg flex bg-foreground has-lifted-focus-ring:focus-ring',
        className
      )}
      {...props}
    />
  );
});

const InputGroupInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      className={twMerge(
        'w-0 grow py-2 first:pl-3 last:pr-3 bg-transparent lift-focus-ring no-focus-ring',
        className
      )}
      {...props}
    />
  );
});

export const InputGroup = Object.assign(InputGroupRoot, {
  Input: InputGroupInput,
});

import React, { useLayoutEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ExitAnimationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  duration?: number;
  children: React.ReactNode;
}

export const ExitAnimation = ({
  isOpen,
  duration = 150,
  className,
  ...props
}: ExitAnimationProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useLayoutEffect(() => {
    if (isOpen && !shouldRender) {
      setShouldRender(true);
    } else if (!isOpen && shouldRender) {
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, duration);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isOpen, shouldRender, duration]);

  return shouldRender ? (
    <div className={twMerge(!isOpen && 'exiting', className)} {...props} />
  ) : null;
};

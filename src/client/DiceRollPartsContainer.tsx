import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface DiceRollPartsContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DiceRollPartsContainer = ({
  className,
  ...props
}: DiceRollPartsContainerProps) => {
  return (
    <div
      className={twMerge('flex flex-wrap items-center gap-2', className)}
      {...props}
    />
  );
};

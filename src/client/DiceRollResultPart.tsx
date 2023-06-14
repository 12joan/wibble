/* eslint-disable no-case-declarations */
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { TDiceRollResultPart } from '../core/dice/types';
import { DieIcon } from './DieIcon';

const textClassName = 'text-lg font-medium';

interface OperatorProps {
  children: string;
}

const Operator = ({ children }: OperatorProps) => (
  <span
    className={twMerge(textClassName, '-translate-y-0.5')}
    children={children}
  />
);

export interface DiceRollResultPartProps {
  part: TDiceRollResultPart;
  isFirst: boolean;
}

export const DiceRollResultPart = ({
  part,
  isFirst,
}: DiceRollResultPartProps) => {
  switch (part.type) {
    case 'dice':
      return (
        <>
          {!isFirst && <Operator>+</Operator>}

          {part.values.map((value, index) => (
            <DieIcon
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              die={part.die}
              value={value}
              pathClassName="fill-current"
              valueClassName="fill-white dark:fill-black"
            />
          ))}
        </>
      );

    case 'modifier':
      const { value } = part;
      const isNegative = value < 0;
      const showOperator = !isFirst || isNegative;

      return (
        <>
          {showOperator && <Operator>{isNegative ? '-' : '+'}</Operator>}

          <span
            className={twMerge(textClassName, '-translate-y-[0.0625rem]')}
            children={Math.abs(value)}
          />
        </>
      );
  }
};

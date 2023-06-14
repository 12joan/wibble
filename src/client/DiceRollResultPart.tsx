import React from 'react';
import { TDiceRollResultPart } from '../core/dice/types';
import { DieIcon } from './DieIcon';

export interface DiceRollResultPartProps {
  part: TDiceRollResultPart;
}

export const DiceRollResultPart = ({ part }: DiceRollResultPartProps) => {
  switch (part.type) {
    case 'dice':
      return (
        <>
          {part.values.map((value, index) => (
            <DieIcon
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              die={part.die}
              value={value}
              pathClassName="fill-current"
              valueClassName="fill-white"
            />
          ))}
        </>
      );

    case 'modifier':
      return (
        <span className="text-lg font-medium mx-[0.3ex]">
          {part.value > 0 ? '+ ' : '- '}
          {Math.abs(part.value)}
        </span>
      );
  }
};

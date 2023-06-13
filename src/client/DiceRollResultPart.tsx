import React from 'react';
import { TDiceRollResultPart } from '../core/dice/types';
import { getDieShape } from './dieShapes';
import { DieValueSVG } from './DieSVG';

export interface DiceRollResultPartProps {
  part: TDiceRollResultPart;
}

export const DiceRollResultPart = ({ part }: DiceRollResultPartProps) => {
  switch (part.type) {
    case 'dice':
      return (
        <>
          {part.values.map((value, index) => (
            <DieValueSVG
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              {...getDieShape(part.die)}
              label={value.toString()}
            />
          ))}
        </>
      );

    case 'modifier':
      return (
        <span className="text-sm font-medium mx-[0.3ex]">
          {part.value > 0 ? '+ ' : '- '}
          {Math.abs(part.value)}
        </span>
      );
  }
};

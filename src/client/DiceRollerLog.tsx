import React from 'react';
import { TDiceRollResult } from '../core/dice/types';
import { DiceRollResult } from './DiceRollResult';
import { ReverseScroll } from './ReverseScroll';

export interface DiceRollerLogProps {
  diceRollResults: TDiceRollResult[];
}

export const DiceRollerLog = ({ diceRollResults }: DiceRollerLogProps) => {
  return (
    <ReverseScroll className="grow px-4 pt-4 flex flex-col">
      {diceRollResults.map((result, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <DiceRollResult key={index} result={result} />
      ))}
    </ReverseScroll>
  );
};

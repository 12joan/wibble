import React from 'react';
import { TDiceRollResult } from '../core/dice/types';
import { DiceRollerLog } from './DiceRollerLog';
import { DiceRollerNotationInput } from './DiceRollerNotationInput';

export interface DiceRollerProps {
  diceRollResults: TDiceRollResult[];
}

export const DiceRoller = ({ diceRollResults }: DiceRollerProps) => {
  return (
    <div className="h-full flex flex-col">
      <DiceRollerLog diceRollResults={diceRollResults} />

      <div className="p-4 flex gap-2">
        <DiceRollerNotationInput />
      </div>
    </div>
  );
};

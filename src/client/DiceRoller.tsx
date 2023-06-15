import React from 'react';
import { TDiceRollResult } from '../core/dice/types';
import { DiceRollerLog } from './DiceRollerLog';
import { DiceRollerNotationInput } from './DiceRollerNotationInput';

export interface DiceRollerProps {
  diceRollResults: TDiceRollResult[];
  wrapControls: (children: React.ReactNode) => React.ReactNode;
}

export const DiceRoller = ({
  diceRollResults,
  wrapControls,
}: DiceRollerProps) => {
  return (
    <div className="h-full flex flex-col">
      <DiceRollerLog diceRollResults={diceRollResults} />

      {wrapControls(
        <div className="p-4">
          <DiceRollerNotationInput />
        </div>
      )}
    </div>
  );
};

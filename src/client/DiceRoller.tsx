import React, { useState } from 'react';
import { getDiceRollResultTotal } from '../core/dice/getDiceRollResultTotal';
import { parseDiceNotation } from '../core/dice/parseDiceNotation';
import { TDiceRollResult, TDie } from '../core/dice/types';
import { useAppContext } from './appContext';
import { DiceRollResultPart } from './DiceRollResultPart';
import { getDieShape } from './dieShapes';
import { DieButtonSVG } from './DieSVG';
import { ReverseScroll } from './ReverseScroll';

export interface DiceRollerProps {
  diceRollResults: TDiceRollResult[];
}

export const DiceRoller = ({ diceRollResults }: DiceRollerProps) => {
  const { performDiceRoll } = useAppContext();
  const [diceNotation, setDiceNotation] = useState('');

  const handleSingleDieRoll = (die: TDie) => {
    performDiceRoll({
      label: die.toString(),
      parts: [{ type: 'dice', die, count: 1 }],
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parts = parseDiceNotation(diceNotation);
    if (!parts) throw new Error('Invalid dice notation');
    performDiceRoll({ label: diceNotation, parts });
  };

  return (
    <div className="h-full flex flex-col">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={diceNotation}
          onChange={(event) => setDiceNotation(event.target.value)}
          className="grow p-2 border rounded-lg"
        />

        <button type="submit" className="py-2 px-4 bg-slate-200 rounded-lg">
          Roll
        </button>
      </form>

      <div className="flex gap-2">
        {[4, 6, 8, 10, 12, 20, 100].map((die: TDie) => (
          <button
            type="button"
            key={die}
            onClick={() => handleSingleDieRoll(die)}
          >
            <DieButtonSVG {...getDieShape(die)} label={die.toString()} />
          </button>
        ))}
      </div>

      <ReverseScroll className="grow space-y-4 p-4">
        {diceRollResults.map((result, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="p-4 grid grid-cols-2 gap-2 rounded-lg bg-white dark:bg-slate-900 border dark:border-transparent"
          >
            <div className="flex flex-col text-center justify-center">
              {result.label && (
                <div className="text-lg font-medium">{result.label}</div>
              )}

              <div className="text-5xl font-medium">
                {getDiceRollResultTotal(result)}
              </div>
            </div>

            <div className="flex flex-wrap items-center">
              {result.parts.map((part, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <DiceRollResultPart key={index} part={part} />
              ))}
            </div>
          </div>
        ))}
      </ReverseScroll>
    </div>
  );
};

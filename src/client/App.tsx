import React, { useState } from 'react';
import { getDiceRollResultTotal } from '../core/dice/getDiceRollResultTotal';
import { parseDiceNotation } from '../core/dice/parseDiceNotation';
import { TDiceRollResult } from '../core/dice/types';
import { DiceRollResultPart } from './DiceRollResultPart';
import { useSocket } from './useSocket';

export const App = () => {
  const [diceNotation, setDiceNotation] = useState('');
  const [diceRollResults, setDiceRollResults] = useState<TDiceRollResult[]>([]);

  const { isConnected, performDiceRoll } = useSocket({
    onDiceRollResult: (result) => {
      setDiceRollResults((prev) => [result, ...prev]);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parts = parseDiceNotation(diceNotation);
    if (!parts) throw new Error('Invalid dice notation');
    performDiceRoll({ label: diceNotation, parts });
  };

  return (
    <div className="p-8 space-y-8">
      <p>isConnected: {isConnected ? 'true' : 'false'}</p>

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

      <div className="max-w-sm divide-y border rounded-lg">
        {diceRollResults.map((result, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="p-4 grid grid-cols-2 gap-2"
          >
            <div className="flex flex-col text-center justify-center">
              {result.label && (
                <div className="text-lg font-medium">{result.label}</div>
              )}

              <div className="text-5xl font-medium">
                {getDiceRollResultTotal(result)}
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center">
              {result.parts.map((part, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <DiceRollResultPart key={index} part={part} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

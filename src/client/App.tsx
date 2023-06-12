import React, { useState } from 'react';
import { getDiceRollResultTotal } from '../core/dice/getDiceRollResultTotal';
import { TDiceRollResult } from '../core/dice/types';
import { DiceRollResultPart } from './DiceRollResultPart';
import { useSocket } from './useSocket';

export const App = () => {
  const [diceRollResults, setDiceRollResults] = useState<TDiceRollResult[]>([]);

  const { isConnected, performDiceRoll } = useSocket({
    onDiceRollResult: (result) => {
      setDiceRollResults((prev) => [result, ...prev]);
    },
  });

  const handleClick = () => {
    performDiceRoll({
      label: '4d6 + 2',
      parts: [
        { type: 'dice', die: 6, count: 4 },
        { type: 'modifier', value: 2 },
      ],
    });
  };

  return (
    <div className="p-8 space-y-8">
      <p>isConnected: {isConnected ? 'true' : 'false'}</p>

      <button type="button" onClick={handleClick} disabled={!isConnected}>
        Roll the dice
      </button>

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

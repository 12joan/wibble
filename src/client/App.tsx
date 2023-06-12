import React, { useState } from 'react';
import { TDiceRollResult } from '../core/dice/types';
import { DiceRollResultPart } from './DiceRollResultPart';
import { useSocket } from './useSocket';

export const App = () => {
  const [diceRollResult, setDiceRollResult] = useState<TDiceRollResult | null>(
    null
  );

  const { isConnected, performDiceRoll } = useSocket({
    onDiceRollResult: (result) => {
      setDiceRollResult(result);
    },
  });

  const handleClick = () => {
    performDiceRoll({
      label: 'test',
      parts: [
        { type: 'dice', die: 4, count: 1 },
        { type: 'modifier', value: 2 },
        { type: 'dice', die: 6, count: 1 },
        { type: 'dice', die: 8, count: 1 },
        { type: 'dice', die: 10, count: 1 },
        { type: 'modifier', value: -2 },
        { type: 'modifier', value: 2 },
        { type: 'dice', die: 12, count: 1 },
        { type: 'dice', die: 20, count: 1 },
        { type: 'dice', die: '20A', count: 1 },
        { type: 'dice', die: '20D', count: 1 },
        { type: 'dice', die: 100, count: 1 },
      ],
    });
  };

  return (
    <div className="p-8 space-y-8">
      <p>isConnected: {isConnected ? 'true' : 'false'}</p>

      <button type="button" onClick={handleClick} disabled={!isConnected}>
        Roll the dice
      </button>

      {diceRollResult && (
        <div className="flex flex-wrap items-center">
          {diceRollResult.parts.map((part, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <DiceRollResultPart key={index} part={part} />
          ))}
        </div>
      )}
    </div>
  );
};

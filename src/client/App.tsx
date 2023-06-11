import React, { useState } from 'react';
import { DiceRollResult } from '../core/dice/types';
import { useSocket } from './useSocket';

export const App = () => {
  const [diceRollResult, setDiceRollResult] = useState<DiceRollResult | null>(
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
        { type: 'dice', count: 1, die: 6 },
        { type: 'modifier', value: 7 },
      ],
    });
  };

  return (
    <div>
      <p>isConnected: {isConnected ? 'true' : 'false'}</p>

      <button type="button" onClick={handleClick} disabled={!isConnected}>
        Roll the dice
      </button>

      {diceRollResult && (
        <pre>
          <code>{JSON.stringify(diceRollResult, null, 2)}</code>
        </pre>
      )}
    </div>
  );
};

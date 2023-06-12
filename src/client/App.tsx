import React, { useState } from 'react';
import { DiceRollResult } from '../core/dice/types';
import { getDieShape } from './dieShapes';
import { DieValueSVG } from './DieSVG';
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
        { type: 'dice', count: 784, die: 6 },
        { type: 'modifier', value: 7 },
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
        <div className="flex flex-wrap">
          {diceRollResult.partsDieValues.flat(1).map((dieValue, index) => (
            <DieValueSVG
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              {...getDieShape(6)}
              label={dieValue.toString()}
            />
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { getDiceRollResultTotal } from '../core/dice/getDiceRollResultTotal';
import { TDiceRollResult } from '../core/dice/types';
import { DiceRollResultPart } from './DiceRollResultPart';

export interface DiceRollResultProps {
  result: TDiceRollResult;
}

export const DiceRollResult = ({ result }: DiceRollResultProps) => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);

    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className={twMerge(
        'p-3 flex gap-3 items-center bg-foreground first:mt-auto',
        'border-x border-b first:border-t',
        'first:rounded-t-lg last:rounded-b-lg',
        isFirstRender && 'bg-blue-200 dark:bg-blue-800',
        isAnimating && 'duration-1000'
      )}
    >
      <div className="flex flex-col grow">
        {result.label && (
          <div className="text-sm font-medium">{result.label}</div>
        )}

        <div className="text-xl">{getDiceRollResultTotal(result)}</div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {result.parts.map((part, index) => (
          <DiceRollResultPart
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            part={part}
            isFirst={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

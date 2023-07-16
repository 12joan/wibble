import React, { useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { getDiceRollResultTotal } from '../core/dice/getDiceRollResultTotal';
import { TDiceRollResult } from '../core/dice/types';
import { useAppContext } from './appContext';
import { Button } from './Button';
import { DiceRollResultPart } from './DiceRollResultPart';
import { ExitAnimation } from './ExitAnimation';
import { useDiceRollResultMenu } from './useDiceRollResultMenu';

export interface DiceRollResultProps {
  result: TDiceRollResult;
}

export const DiceRollResult = ({ result }: DiceRollResultProps) => {
  const { deletedDiceRollIds } = useAppContext();

  const isDeleted = useMemo(
    () => deletedDiceRollIds.includes(result.id),
    [deletedDiceRollIds, result.id]
  );

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  const {
    menu,
    menuIsOpen,
    setMenuIsOpen,
    getReferenceProps,
    setReference,
    setPointerPosition,
  } = useDiceRollResultMenu({ result });

  useEffect(() => {
    setIsFirstRender(false);

    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const total = useMemo(() => getDiceRollResultTotal(result), [result]);

  return (
    <ExitAnimation isOpen={!isDeleted} className="group" duration={300}>
      <Button
        ref={setReference}
        {...getReferenceProps()}
        onClick={() => setMenuIsOpen((isOpen) => !isOpen)}
        onPointerDown={(event) => {
          if (!menuIsOpen) {
            setPointerPosition({
              x: event.clientX,
              y: event.clientY,
            });
          }
        }}
        shape="custom"
        className={twMerge(
          'w-full text-left p-3 flex gap-3 items-center bg-foreground',
          'border-x border-b border-t-0 group-first:border-t',
          'rounded-none group-first:rounded-t-lg group-last:rounded-b-lg',
          isFirstRender && 'bg-blue-200 dark:bg-blue-800',
          isAnimating && 'duration-1000',
          'exiting:bg-danger exiting:animate-out exiting:fade-out exiting:duration-300'
        )}
        aria-label={`${result.postingAs.name} rolled ${total}`}
      >
        <div className="flex flex-col grow">
          {result.label && (
            <div className="text-sm font-medium">{result.label}</div>
          )}

          <div className="text-xl">
            <span className="sr-only">Total:</span> {total}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          {result.parts.map((part, index) => (
            <DiceRollResultPart
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              part={part}
              isFirst={index === 0}
            />
          ))}
        </div>
      </Button>

      {menu}
    </ExitAnimation>
  );
};

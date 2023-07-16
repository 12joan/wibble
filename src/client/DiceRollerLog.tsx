import React, { useMemo } from 'react';
import * as Icons from 'react-bootstrap-icons';
import { useAppContext } from './appContext';
import { DiceRollResult } from './DiceRollResult';
import { ExitAnimation } from './ExitAnimation';
import { groupConsecutiveBy } from './groupConsecutiveBy';
import { ReverseScroll } from './ReverseScroll';

export const DiceRollerLog = () => {
  const { diceRollResults, deletedDiceRollIds } = useAppContext();

  const groupedDiceRollResults = useMemo(
    () =>
      groupConsecutiveBy(
        diceRollResults,
        ({ postingAs }) => `${postingAs.id}-${postingAs.name}`
      ).map((results) => ({
        postingAs: results[0].postingAs,
        diceRollResults: results,
      })),
    [diceRollResults]
  );

  return (
    <ReverseScroll
      itemCount={diceRollResults.length}
      className="grow p-4 md:pb-0 flex flex-col gap-2"
      aria-live="polite"
      aria-relevant="additions"
    >
      {groupedDiceRollResults.map(({ postingAs, diceRollResults }, index) => (
        <ExitAnimation
          // eslint-disable-next-line react/no-array-index-key
          key={`${postingAs.id}-${index}`}
          isOpen={diceRollResults.some(
            ({ id }) => !deletedDiceRollIds.includes(id)
          )}
          duration={300}
          className="first:mt-auto"
        >
          <div className="text-sm font-medium text-text-muted flex gap-1.5 items-center sticky -top-4 bg-background p-2 z-[1] exiting:animate-out exiting:fade-out exiting:duration-300">
            <Icons.PersonCircle aria-hidden />
            {postingAs.name}
          </div>

          <div>
            {diceRollResults.map((result) => (
              <DiceRollResult key={result.id} result={result} />
            ))}
          </div>
        </ExitAnimation>
      ))}
    </ReverseScroll>
  );
};

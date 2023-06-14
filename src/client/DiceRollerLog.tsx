import React, { useMemo } from 'react';
import * as Icons from 'react-bootstrap-icons';
import { TDiceRollResult } from '../core/dice/types';
import { DiceRollResult } from './DiceRollResult';
import { groupConsecutiveBy } from './groupConsecutiveBy';
import { ReverseScroll } from './ReverseScroll';

export interface DiceRollerLogProps {
  diceRollResults: TDiceRollResult[];
}

export const DiceRollerLog = ({ diceRollResults }: DiceRollerLogProps) => {
  const groupedDiceRollResults = useMemo(
    () =>
      groupConsecutiveBy(diceRollResults, (result) => result.postingAs.id).map(
        (results) => ({
          postingAs: results[0].postingAs,
          diceRollResults: results,
        })
      ),
    [diceRollResults]
  );

  return (
    <ReverseScroll
      itemCount={diceRollResults.length}
      className="grow px-4 pt-4 flex flex-col gap-2"
    >
      {groupedDiceRollResults.map(({ postingAs, diceRollResults }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="first:mt-auto">
          <div className="text-sm font-medium text-text-muted flex gap-1.5 items-center sticky -top-4 bg-background p-2 z-[1]">
            <Icons.PersonCircle aria-hidden />
            {postingAs.name}
          </div>

          <div>
            {diceRollResults.map((result, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <DiceRollResult key={index} result={result} />
            ))}
          </div>
        </div>
      ))}
    </ReverseScroll>
  );
};

import React from 'react';
import { BackAndCancel } from './BackAndCancel';
import { NavMenuItem } from './MenuItem';
import { TDicePickerState } from './state';

import { allDice } from '~/core/dice/allDice';
import { TDie } from '~/core/dice/types';

const customLabels: { [key in TDie]?: string } = {
  '20A': 'd20 (advantage)',
  '20D': 'd20 (disadvantage)',
};

const specialDice: { [key in TDie]?: 'no-count' | 'no-count-or-modifier' } = {
  20: 'no-count',
  '20A': 'no-count',
  '20D': 'no-count',
  100: 'no-count-or-modifier',
};

export const PickDieType = () => {
  const beginComposingDie =
    (die: TDie) =>
    (state: TDicePickerState): TDicePickerState => ({
      ...state,
      composingDie: die,
    });

  const addDie =
    (die: TDie) =>
    (state: TDicePickerState): TDicePickerState => ({
      ...state,
      diceRollRequestParts: [
        ...state.diceRollRequestParts,
        { type: 'dice', die, count: 1 },
      ],
    });

  return (
    <>
      <BackAndCancel />

      <h1 className="font-medium">What kind of dice?</h1>

      <div>
        {allDice.map((die) => {
          const label = customLabels[die] ?? `d${die}`;
          const specialBehaviour = specialDice[die] ?? 'count';

          const transformState =
            specialBehaviour === 'count' ? beginComposingDie(die) : addDie(die);

          const destination = {
            count: '/pick-die-count',
            'no-count': '/pick-modifier',
            'no-count-or-modifier': '/review-dice-roll',
          }[specialBehaviour];

          return (
            <NavMenuItem
              key={die}
              to={destination}
              transformState={transformState}
              children={label}
            />
          );
        })}
      </div>
    </>
  );
};

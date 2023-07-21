import React from 'react';
import {
  DiceRollResultPart,
  DiceRollResultPartProps,
} from './DiceRollResultPart';

import { getDieSides } from '~/core/dice/getDieSides';
import { TDiceRollRequestPart, TDiceRollResultPart } from '~/core/types';

export interface DiceRollRequestPartProps
  extends Omit<DiceRollResultPartProps, 'part'> {
  part: TDiceRollRequestPart;
}

export const DiceRollRequestPart = ({
  part: requestPart,
  ...props
}: DiceRollRequestPartProps) => {
  const resultPart: TDiceRollResultPart = (() => {
    switch (requestPart.type) {
      case 'dice':
        return {
          ...requestPart,
          values: Array.from({ length: requestPart.count }, () =>
            getDieSides(requestPart.die)
          ).flat(1),
        };

      case 'modifier':
        return requestPart;
    }
  })();

  return <DiceRollResultPart part={resultPart} {...props} />;
};

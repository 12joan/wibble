import { zip } from 'lodash';
import { getDiceRollResultPartValue } from './getDiceRollResultPartValue';
import { DiceRollResult } from './types';

export const getDiceRollResultTotal = ({
  request,
  partsDieValues,
}: DiceRollResult): number => {
  const partsValues = zip(request.parts, partsDieValues).map(
    ([part, dieValues]) => {
      return getDiceRollResultPartValue(part!, dieValues!);
    }
  );

  return partsValues.reduce((sum, partValue) => sum + partValue, 0);
};

import { zip } from 'lodash';
import { getDiceRollResultPartValue } from './getDiceRollResultPartValue';
import { DiceRollResult } from './types';

export const getDiceRollResultTotal = ({
  parts,
  partsDieValues,
}: DiceRollResult): number => {
  const partsValues = zip(parts, partsDieValues).map(([part, dieValues]) => {
    return getDiceRollResultPartValue(part!, dieValues!);
  });

  return partsValues.reduce((sum, partValue) => sum + partValue, 0);
};

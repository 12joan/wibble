import { getDiceRollResultPartValue } from './getDiceRollResultPartValue';
import { TDiceRollResult } from './types';

export const getDiceRollResultTotal = ({ parts }: TDiceRollResult): number => {
  const partsValues = parts.map(getDiceRollResultPartValue);
  return partsValues.reduce((sum, partValue) => sum + partValue, 0);
};

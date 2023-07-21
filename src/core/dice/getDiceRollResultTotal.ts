import { TDiceRollResult } from '../types';
import { getDiceRollResultPartValue } from './getDiceRollResultPartValue';

export const getDiceRollResultTotal = ({ parts }: TDiceRollResult): number => {
  const partsValues = parts.map(getDiceRollResultPartValue);
  return partsValues.reduce((sum, partValue) => sum + partValue, 0);
};

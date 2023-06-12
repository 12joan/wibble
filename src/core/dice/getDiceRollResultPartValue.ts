import { chunk } from 'lodash';
import { TDiceRollResultPart } from './types';

export const getDiceRollResultPartValue = (
  part: TDiceRollResultPart
): number => {
  if (part.type === 'modifier') {
    return part.value;
  }

  if (part.type === 'dice') {
    const valuesWithAdvDis = ['20A', '20D'].includes(part.die as string)
      ? chunk(part.values, 2).map((chunk) => {
          return part.die === '20A' ? Math.max(...chunk) : Math.min(...chunk);
        })
      : part.values;

    return valuesWithAdvDis.reduce((sum, value) => sum + value, 0);
  }

  throw new Error('Unknown part type');
};

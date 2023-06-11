import { chunk } from 'lodash';
import { DiceRollRequestPart } from './types';

export const getDiceRollResultPartValue = (
  part: DiceRollRequestPart,
  partDieValues: number[]
): number => {
  if (part.type === 'modifier') {
    return part.value;
  }

  if (part.type === 'dice') {
    const partDieValuesWithAdvDis = ['20A', '20D'].includes(part.die as string)
      ? chunk(partDieValues, 2).map((chunk) => {
          return part.die === '20A' ? Math.max(...chunk) : Math.min(...chunk);
        })
      : partDieValues;

    return partDieValuesWithAdvDis.reduce((sum, dieValue) => sum + dieValue, 0);
  }

  throw new Error('Unknown part type');
};

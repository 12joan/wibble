import { TDiceRollResultPartDice } from '../types';
import { chunk } from 'lodash';

export const getDiceRollResultPartDiceInactiveValueIndices = (
  part: TDiceRollResultPartDice,
): number[] => {
  if (!['20A', '20D'].includes(part.die as string)) {
    return [];
  }

  if (part.count > 1) {
    const valueChunks = chunk(part.values, 2);

    return valueChunks.flatMap((chunk, index) => {
      const result = getDiceRollResultPartDiceInactiveValueIndices({
        ...part,
        count: 1,
        values: chunk,
      });

      return result.map((valueIndex) => valueIndex + index * 2);
    });
  }

  const [firstValue, secondValue] = part.values;

  if (firstValue === secondValue) {
    return part.die === '20A' ? [1] : [0];
  }

  if (firstValue > secondValue) {
    return part.die === '20A' ? [1] : [0];
  }

  return part.die === '20A' ? [0] : [1];
};

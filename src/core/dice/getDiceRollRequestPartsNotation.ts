/* eslint-disable no-case-declarations */
import { TDiceRollRequestPart } from './types';

export const getDiceRollRequestPartsNotation = (
  parts: TDiceRollRequestPart[]
): string => {
  let notation = '';
  let isFirst = true;

  parts.forEach((part) => {
    switch (part.type) {
      case 'dice':
        notation += `${isFirst ? '' : ' + '}${part.count}d${part.die}`;
        break;

      case 'modifier':
        const { value } = part;
        const isNegative = value < 0;
        const showOperator = !isFirst || isNegative;
        const operator = showOperator
          ? `${isFirst ? '' : ' '}${isNegative ? '-' : '+'} `
          : '';
        notation += `${operator}${Math.abs(value)}`;
        break;
    }

    isFirst = false;
  });

  return notation;
};
